import nodemailer from "nodemailer";
import { db, parseRow } from "./store";
import { origin } from "./auth";
export function mailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.MAIL_FROM &&
      process.env.MAIL_TO,
  );
}
export async function notifyInquiry(id: string) {
  if (!mailConfigured()) return false;
  const sql = db();
  const now = Date.now();
  const claim = sql
    .prepare(
      "UPDATE inquiries SET notification_lease=?,notification_attempts=notification_attempts+1 WHERE id=? AND notification!='sent' AND notification_lease<?",
    )
    .run(now + 60000, id, now);
  if (!claim.changes) return false;
  const row = parseRow(
    sql.prepare("SELECT * FROM inquiries WHERE id=?").get(id),
  );
  const p = row.payload;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === "465",
    requireTLS: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10000,
    socketTimeout: 20000,
  });
  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: p.email,
      subject: `[KZ 접수] ${p.intent === "booking" ? "예약 신청" : "견적 문의"} · ${row.id}`,
      messageId: `<${row.id}@kz.tripsoda.com>`,
      text: [
        `접수번호: ${row.id}`,
        `고객: ${p.name}`,
        `유형: ${p.audience === "business" ? "기업·여행사" : "개인·그룹"}`,
        `연락처: ${p.email}`,
        `회사: ${p.company || "-"}`,
        `일정: ${p.date || "협의"} / ${p.people}명`,
        `서비스: ${p.services.join(", ")}`,
        `요청: ${p.message}`,
        `관리 화면: ${origin()}/admin/`,
        `예약은 담당자 연락 및 계약금 입금 확인 후 확정합니다.`,
      ].join("\n"),
    });
    sql
      .prepare(
        "UPDATE inquiries SET notification='sent',notification_error=NULL,notification_lease=0 WHERE id=?",
      )
      .run(id);
    return true;
  } catch {
    sql
      .prepare(
        "UPDATE inquiries SET notification='failed',notification_error='SMTP_DELIVERY_FAILED',notification_lease=0 WHERE id=?",
      )
      .run(id);
    return false;
  } finally {
    transport.close();
  }
}
