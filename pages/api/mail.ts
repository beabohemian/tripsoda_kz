import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    name, email, phone, date, duration, pax, destinations, accommodation, message 
  } = req.body;

  // Validate required fields
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // SMTP Configuration from environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"TripSoda Kazakhstan" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || 'jinki@tripsoda.com',
    subject: `[문의] ${name}님의 여행 견적 요청`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; rounded: 10px;">
        <h2 style="color: #FF6B00; border-bottom: 2px solid #FF6B00; padding-bottom: 10px;">새로운 투어 견적 요청</h2>
        
        <h3 style="background: #f9f9f9; padding: 10px; border-left: 4px solid #FF6B00;">1. 고객 정보</h3>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>

        <h3 style="background: #f9f9f9; padding: 10px; border-left: 4px solid #FF6B00;">2. 여행 계획</h3>
        <p><strong>예상 시작일:</strong> ${date || '미정'}</p>
        <p><strong>여행 기간:</strong> ${duration || '미정'}</p>
        <p><strong>인원 수:</strong> ${pax || '미정'}</p>
        <p><strong>선호 숙소:</strong> ${accommodation || '미정'}</p>
        <p><strong>희망 방문지:</strong> ${destinations || '미정'}</p>

        <h3 style="background: #f9f9f9; padding: 10px; border-left: 4px solid #FF6B00;">3. 추가 문의사항</h3>
        <p style="white-space: pre-wrap;">${message || '없음'}</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">이 메일은 트립소다 카자흐스탄 홈페이지에서 발송되었습니다.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: String(error) });
  }
}
