import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes, randomUUID, scryptSync } from "node:crypto";
import assert from "node:assert/strict";
const dataDir = mkdtempSync(join(tmpdir(), "kz-inquiry-test-"));
const password = randomBytes(24).toString("hex"),
  salt = randomBytes(32).toString("hex");
const base = "http://127.0.0.1:3013";
const env = {
  ...process.env,
  APP_ORIGIN: base,
  KZ_TRUSTED_COUNTRY_HEADER: "x-test-country",
  KZ_DATA_DIR: dataDir,
  NEXT_DIST_DIR: ".next-test",
  ADMIN_PASSWORD_HASH: `${salt}:${scryptSync(password, salt, 64).toString("hex")}`,
  ADMIN_SESSION_SECRET: randomBytes(48).toString("hex"),
  SMTP_HOST: "",
  SMTP_USER: "",
  SMTP_PASSWORD: "",
  MAIL_FROM: "",
  MAIL_TO: "",
};
let child,
  output = "";
function start() {
  child = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "dev", "-H", "127.0.0.1", "-p", "3013"],
    { env, stdio: ["ignore", "pipe", "pipe"] },
  );
  child.stdout.on("data", (v) => (output += v));
  child.stderr.on("data", (v) => (output += v));
}
async function ready() {
  for (let i = 0; i < 90; i++) {
    try {
      const r = await fetch(base + "/api/admin/session/");
      if (r.status === 401) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Test server did not start: " + output.slice(-3000));
}
async function stop() {
  if (child && child.exitCode === null) {
    child.kill("SIGTERM");
    await new Promise((r) => child.once("exit", r));
  }
}
let cookie = "";
async function api(
  path,
  body,
  method = "POST",
  withCookie = false,
  origin = base,
) {
  const response = await fetch(base + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      ...(withCookie ? { Cookie: cookie } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text.slice(0, 500) };
  }
  return { response, data };
}
try {
  start();
  await ready();
  assert.equal(
    (await api("/api/admin/inquiries/", undefined, "GET")).response.status,
    401,
  );
  const login = await api("/api/admin/session/", { password });
  assert.equal(login.response.status, 200, JSON.stringify(login.data));
  cookie = login.response.headers.get("set-cookie").split(";")[0];
  assert.match(login.response.headers.get("set-cookie"), /HttpOnly/);
  const payload = {
    key: randomUUID(),
    name: "Integration Test",
    company: "Test Agency",
    email: "test@example.com",
    date: "2027-01-15",
    people: 8,
    budget: "USD 4000",
    message: "Test only — no email delivery",
    services: ["incentive", "interpreter"],
    audience: "business",
    intent: "booking",
    language: "ko",
    example: "",
    consent: true,
  };
  assert.equal(
    (
      await api(
        "/api/inquiries/",
        payload,
        "POST",
        false,
        "https://invalid.example",
      )
    ).response.status,
    403,
  );
  assert.equal(
    (await api("/api/inquiries/", { ...payload, consent: false })).response
      .status,
    400,
  );
  const created = await api("/api/inquiries/", payload);
  assert.equal(created.response.status, 201, JSON.stringify(created.data));
  const id = created.data.id;
  const duplicate = await api("/api/inquiries/", payload);
  assert.equal(duplicate.data.id, id);
  let list = await api("/api/admin/inquiries/", undefined, "GET", true);
  assert.equal(list.data.total, 1);
  assert.equal(list.data.rows[0].notification, "pending");
  assert.equal(list.data.mailConfigured, false);
  const premature = await api(
    "/api/admin/inquiries/",
    { id, version: 1, status: "confirmed", notes: "", deposit: null },
    "POST",
    true,
  );
  assert.equal(premature.response.status, 400);
  let update = await api(
    "/api/admin/inquiries/",
    {
      id,
      version: 1,
      status: "contacted",
      notes: "Coordinator contacted guest",
    },
    "POST",
    true,
  );
  assert.equal(update.response.status, 200);
  assert.equal(
    (
      await api(
        "/api/admin/inquiries/",
        { id, version: 1, status: "contacted", notes: "stale" },
        "POST",
        true,
      )
    ).response.status,
    409,
  );
  update = await api(
    "/api/admin/inquiries/",
    { id, version: 2, status: "awaiting_deposit", notes: "Deposit requested" },
    "POST",
    true,
  );
  assert.equal(update.response.status, 200);
  assert.equal(
    (
      await api(
        "/api/admin/inquiries/",
        { id, version: 3, status: "confirmed", notes: "", deposit: null },
        "POST",
        true,
      )
    ).response.status,
    400,
  );
  update = await api(
    "/api/admin/inquiries/",
    {
      id,
      version: 3,
      status: "confirmed",
      notes: "Test deposit only",
      deposit: {
        amount: 500,
        currency: "USD",
        reference: "TEST-ONLY",
        verified: true,
      },
    },
    "POST",
    true,
  );
  assert.equal(update.response.status, 200);
  assert.equal(update.data.row.status, "confirmed");
  await stop();
  start();
  await ready();
  list = await api("/api/admin/inquiries/", undefined, "GET", true);
  assert.equal(list.data.total, 1);
  assert.equal(list.data.rows[0].status, "confirmed");
  assert.equal(list.data.rows[0].deposit.amount, 500);
  assert.equal(
    (await api("/api/admin/inquiries/", undefined, "GET")).response.status,
    401,
  );
  const medical = await api("/api/inquiries/", {
    ...payload,
    key: randomUUID(),
    audience: "personal",
    language: "kk",
    message: "[KOREA MEDICAL TOUR] Test only",
    services: ["checkup", "beauty", "specialist"],
  });
  assert.equal(medical.response.status, 201);
  list = await api("/api/admin/inquiries/", undefined, "GET", true);
  assert.deepEqual(
    list.data.rows.find((row) => row.id === medical.data.id).payload.services,
    ["checkup", "beauty", "specialist"],
  );
  console.log(
    "PASS: authentication, origin check, validation, idempotency, durable storage across restart, email outbox, booking transitions, deposit verification and concurrent-update protection. No emails sent.",
  );
} catch (e) {
  console.error(e);
  console.error(output.slice(-3000));
  process.exitCode = 1;
} finally {
  await stop();
  rmSync(dataDir, { recursive: true, force: true });
}
