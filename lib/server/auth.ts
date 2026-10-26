import type { NextApiRequest, NextApiResponse } from "next";
import { createHmac, timingSafeEqual, scryptSync, randomBytes } from "crypto";
import { rateLimit } from "./store";
export function origin() {
  return (
    process.env.APP_ORIGIN ||
    (process.env.NODE_ENV === "development" ? "http://127.0.0.1:3011" : "")
  );
}
export function sameOrigin(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (!origin() || req.headers.origin !== origin()) {
    res.status(403).json({ error: "ORIGIN_REJECTED" });
    return false;
  }
  return true;
}
function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("ADMIN_NOT_CONFIGURED");
  return value;
}
function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
function signature(value: string) {
  return createHmac("sha256", secret())
    .update(value + process.env.ADMIN_PASSWORD_HASH)
    .digest("base64url");
}
export function validPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH || "";
  const [salt, expected] = hash.split(":");
  if (!salt || !expected || password.length > 256) return false;
  return safeEqual(scryptSync(password, salt, 64).toString("hex"), expected);
}
export function setSession(res: NextApiResponse) {
  const payload = Buffer.from(
    JSON.stringify({
      exp: Date.now() + 8 * 60 * 60 * 1000,
      nonce: randomBytes(18).toString("hex"),
    }),
  ).toString("base64url");
  res.setHeader(
    "Set-Cookie",
    `kz_admin=${payload}.${signature(payload)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${origin().startsWith("https:") ? "; Secure" : ""}`,
  );
}
export function isAdmin(req: NextApiRequest) {
  try {
    const token = req.cookies.kz_admin || "";
    const [payload, sig] = token.split(".");
    if (!payload || !sig || !safeEqual(signature(payload), sig)) return false;
    return (
      JSON.parse(Buffer.from(payload, "base64url").toString()).exp > Date.now()
    );
  } catch {
    return false;
  }
}
export function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (!isAdmin(req)) {
    res.status(401).json({ error: "UNAUTHORIZED" });
    return false;
  }
  return true;
}
export function clientIdentity(req: NextApiRequest) {
  return process.env.TRUST_PROXY === "true"
    ? String(req.headers["x-forwarded-for"] || req.socket.remoteAddress)
        .split(",")[0]
        .trim()
    : req.socket.remoteAddress || "unknown";
}
export function throttle(
  req: NextApiRequest,
  res: NextApiResponse,
  scope: string,
  limit: number,
  seconds: number,
) {
  if (!rateLimit(scope, clientIdentity(req), limit, seconds)) {
    res.setHeader("Retry-After", String(seconds));
    res.status(429).json({ error: "RATE_LIMITED" });
    return false;
  }
  return true;
}
