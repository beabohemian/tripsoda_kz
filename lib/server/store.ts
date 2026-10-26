import { mkdirSync } from "fs";
import path from "path";
import { createHash, randomUUID } from "crypto";

// Server-only module. Requires Node 24 and a persistent disk.
const { DatabaseSync } = require("node:sqlite");
let database: any;
export function db() {
  if (database) return database;
  if (process.env.NODE_ENV === "production" && !process.env.KZ_DATA_DIR)
    throw new Error("KZ_DATA_DIR is required");
  const dir = process.env.KZ_DATA_DIR || path.join(process.cwd(), ".data");
  mkdirSync(dir, { recursive: true, mode: 0o700 });
  database = new DatabaseSync(path.join(dir, "inquiries.sqlite"));
  database.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY, idempotency_key TEXT UNIQUE NOT NULL, payload TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'requested', created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
      notes TEXT NOT NULL DEFAULT '', deposit TEXT, notification TEXT NOT NULL DEFAULT 'pending',
      notification_attempts INTEGER NOT NULL DEFAULT 0, notification_lease INTEGER NOT NULL DEFAULT 0,
      notification_error TEXT, version INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS audit (id TEXT PRIMARY KEY, inquiry_id TEXT NOT NULL, action TEXT NOT NULL, at TEXT NOT NULL);`);
  return database;
}
export const statuses = [
  "requested",
  "contacted",
  "awaiting_deposit",
  "confirmed",
  "cancelled",
] as const;
export type Status = (typeof statuses)[number];
export type Inquiry = {
  id: string;
  payload: any;
  status: Status;
  created_at: string;
  updated_at: string;
  notes: string;
  deposit: any;
  notification: string;
  notification_attempts: number;
  notification_error: string | null;
  version: number;
};
export function parseRow(row: any): Inquiry {
  return {
    ...row,
    payload: JSON.parse(row.payload),
    deposit: row.deposit ? JSON.parse(row.deposit) : null,
  };
}
export function rateLimit(
  scope: string,
  identity: string,
  limit: number,
  windowSeconds: number,
) {
  const key = createHash("sha256").update(`${scope}:${identity}`).digest("hex");
  const now = Math.floor(Date.now() / 1000);
  const sql = db();
  sql.prepare("DELETE FROM rate_limits WHERE expires < ?").run(now);
  sql
    .prepare(
      "INSERT INTO rate_limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1",
    )
    .run(key, now + windowSeconds);
  return (
    sql.prepare("SELECT count FROM rate_limits WHERE key=?").get(key).count <=
    limit
  );
}
export function saveInquiry(key: string, payload: any) {
  const sql = db();
  const now = new Date().toISOString();
  const id = `KZ-${randomUUID()}`;
  sql
    .prepare(
      "INSERT OR IGNORE INTO inquiries(id,idempotency_key,payload,created_at,updated_at) VALUES(?,?,?,?,?)",
    )
    .run(id, key, JSON.stringify(payload), now, now);
  const row = parseRow(
    sql.prepare("SELECT * FROM inquiries WHERE idempotency_key=?").get(key),
  );
  if (JSON.stringify(row.payload) !== JSON.stringify(payload))
    throw new Error("IDEMPOTENCY_CONFLICT");
  return row;
}
export function updateInquiry(
  id: string,
  version: number,
  status: Status,
  notes: string,
  deposit: any,
) {
  const sql = db();
  sql.exec("BEGIN IMMEDIATE");
  try {
    const row = sql.prepare("SELECT * FROM inquiries WHERE id=?").get(id);
    if (!row) throw new Error("NOT_FOUND");
    if (row.version !== version) throw new Error("CONFLICT");
    const allowed: Record<Status, Status[]> = {
      requested: ["requested", "contacted", "cancelled"],
      contacted: ["contacted", "awaiting_deposit", "cancelled"],
      awaiting_deposit: ["awaiting_deposit", "confirmed", "cancelled"],
      confirmed: ["confirmed", "cancelled"],
      cancelled: ["cancelled", "contacted"],
    };
    if (!allowed[row.status as Status].includes(status))
      throw new Error("INVALID_TRANSITION");
    let verifiedDeposit = row.deposit ? JSON.parse(row.deposit) : null;
    if (status === "confirmed" && row.status !== "confirmed") {
      if (
        !deposit ||
        !Number.isFinite(deposit.amount) ||
        deposit.amount <= 0 ||
        !["KRW", "USD", "KZT", "EUR"].includes(deposit.currency) ||
        typeof deposit.reference !== "string" ||
        deposit.reference.trim().length < 3 ||
        deposit.reference.length > 150 ||
        deposit.verified !== true
      )
        throw new Error("DEPOSIT_REQUIRED");
      verifiedDeposit = {
        amount: deposit.amount,
        currency: deposit.currency,
        reference: deposit.reference.trim(),
        verified_at: new Date().toISOString(),
      };
    }
    const now = new Date().toISOString();
    sql
      .prepare(
        "UPDATE inquiries SET status=?,notes=?,deposit=?,updated_at=?,version=version+1 WHERE id=?",
      )
      .run(
        status,
        notes,
        verifiedDeposit ? JSON.stringify(verifiedDeposit) : null,
        now,
        id,
      );
    sql
      .prepare("INSERT INTO audit(id,inquiry_id,action,at) VALUES(?,?,?,?)")
      .run(
        randomUUID(),
        id,
        JSON.stringify({
          from: row.status,
          to: status,
          depositVerified: status === "confirmed" && row.status !== "confirmed",
        }),
        now,
      );
    sql.exec("COMMIT");
    return parseRow(sql.prepare("SELECT * FROM inquiries WHERE id=?").get(id));
  } catch (e) {
    sql.exec("ROLLBACK");
    throw e;
  }
}
