import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin, sameOrigin } from "../../../lib/server/auth";
import {
  db,
  parseRow,
  statuses,
  updateInquiry,
} from "../../../lib/server/store";
import { mailConfigured, notifyInquiry } from "../../../lib/server/mail";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!requireAdmin(req, res)) return;
  if (req.method === "GET") {
    const page = Math.max(0, Math.min(Number(req.query.page) || 0, 10000));
    const status = String(req.query.status || "");
    if (status && !statuses.includes(status as any))
      return res.status(400).json({ error: "INVALID_STATUS" });
    const sql = db();
    const where = status ? "WHERE status=?" : "";
    const params = status ? [status] : [];
    const rows = sql
      .prepare(
        `SELECT * FROM inquiries ${where} ORDER BY created_at DESC LIMIT 50 OFFSET ?`,
      )
      .all(...params, page * 50)
      .map(parseRow);
    return res.json({
      rows,
      total: sql
        .prepare(`SELECT COUNT(*) AS count FROM inquiries ${where}`)
        .get(...params).count,
      mailConfigured: mailConfigured(),
    });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).end();
  }
  if (!sameOrigin(req, res)) return;
  const p = req.body;
  if (p?.action === "retry-mail") {
    if (!mailConfigured())
      return res.status(503).json({ error: "MAIL_NOT_CONFIGURED" });
    const rows = db()
      .prepare(
        "SELECT id FROM inquiries WHERE notification!='sent' ORDER BY created_at LIMIT 10",
      )
      .all();
    let sent = 0;
    for (const row of rows) if (await notifyInquiry(row.id)) sent++;
    return res.json({ sent });
  }
  if (
    !p ||
    typeof p.id !== "string" ||
    !statuses.includes(p.status) ||
    !Number.isInteger(p.version) ||
    typeof p.notes !== "string" ||
    p.notes.length > 5000
  )
    return res.status(400).json({ error: "INVALID_REQUEST" });
  try {
    return res.json({
      row: updateInquiry(p.id, p.version, p.status, p.notes, p.deposit),
    });
  } catch (e) {
    const code = (e as Error).message;
    return res.status(code === "CONFLICT" ? 409 : 400).json({ error: code });
  }
}
