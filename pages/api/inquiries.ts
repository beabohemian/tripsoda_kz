import type { NextApiRequest, NextApiResponse } from "next";
import { sameOrigin, throttle } from "../../lib/server/auth";
import { saveInquiry } from "../../lib/server/store";
import { notifyInquiry } from "../../lib/server/mail";
export const config = { api: { bodyParser: { sizeLimit: "16kb" } } };
const services = [
  "checkup",
  "beauty",
  "specialist",
  "custom",
  "group",
  "vehicle",
  "guide",
  "hotel",
  "event",
  "incentive",
  "business",
  "interpreter",
  "protocol",
];
const text = (v: unknown, max: number, required = false) =>
  typeof v === "string" &&
  v.length <= max &&
  (!required || v.trim().length > 0);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }
  if (!sameOrigin(req, res) || !throttle(req, res, "inquiry", 8, 3600)) return;
  const p = req.body;
  if (
    !p ||
    !text(p.name, 100, true) ||
    !text(p.email, 200, true) ||
    !text(p.phone, 60, true) ||
    !/^\S+@\S+\.\S+$/.test(p.email) ||
    !text(p.company, 150) ||
    !text(p.message, 2500, true) ||
    !text(p.budget, 100) ||
    !text(p.example, 200) ||
    !["personal", "business"].includes(p.audience) ||
    !["inquiry", "booking"].includes(p.intent) ||
    !["ko", "en", "ru", "kk"].includes(p.language) ||
    !Number.isInteger(p.people) ||
    p.people < 1 ||
    p.people > 10000 ||
    !Array.isArray(p.services) ||
    p.services.length > 10 ||
    p.services.some((s: unknown) => !services.includes(String(s))) ||
    p.consent !== true ||
    !text(p.date, 10) ||
    (p.date && !/^\d{4}-\d{2}-\d{2}$/.test(p.date)) ||
    !/^[a-f0-9-]{36}$/.test(p.key || "")
  )
    return res.status(400).json({ error: "INVALID_REQUEST" });
  if (p.website) return res.status(400).json({ error: "INVALID_REQUEST" });
  try {
    const payload = {
      name: p.name.trim(),
      email: p.email.trim(),
      phone: p.phone.trim(),
      company: p.company.trim(),
      message: p.message.trim(),
      budget: p.budget.trim(),
      example: p.example,
      date: p.date,
      people: p.people,
      services: Array.from(new Set(p.services)),
      audience: p.audience,
      intent: p.intent,
      language: p.language,
      consent: true,
      consentVersion: "2026-10-26",
    };
    const row = saveInquiry(p.key, payload);
    // Durable record is committed before SMTP is attempted; email failure never loses the request.
    await notifyInquiry(row.id);
    return res.status(201).json({ id: row.id, status: row.status });
  } catch (e) {
    return res
      .status((e as Error).message === "IDEMPOTENCY_CONFLICT" ? 409 : 503)
      .json({
        error:
          (e as Error).message === "IDEMPOTENCY_CONFLICT"
            ? "IDEMPOTENCY_CONFLICT"
            : "SAVE_FAILED",
      });
  }
}
