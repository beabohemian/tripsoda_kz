import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, phone, date, duration, pax, destinations, accommodation, message } = req.body

    // SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS?.replace(/ /g, ''), // Remove spaces from app password if present
      },
    })

    // Email Content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'jinki@tripsoda.com', // Send to admin
      replyTo: email, // Allow replying to the customer
      subject: `[홈페이지 문의] ${name}님의 여행 문의입니다.`,
      text: `
                이름: ${name}
                연락처: ${phone}
                이메일: ${email}
                
                예상 여행 날짜: ${date}
                여행 기간: ${duration}
                인원: ${pax}
                희망 방문지: ${destinations}
                숙소 선호: ${accommodation}
                
                추가 문의사항:
                ${message}
            `,
      html: `
    <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #fff; padding: 40px; border-radius: 12px; border: 1px solid #eaeaea;">
            
            <!-- Header -->
            <div style="text-align: center; border-bottom: 2px solid #00f0ff; padding-bottom: 20px; margin-bottom: 30px;">
                <h2 style="color: #000; margin: 0; font-size: 24px;">✈️ 새로운 여행 문의가 도착했습니다!</h2>
                <p style="color: #666; font-size: 14px; margin-top: 10px;">홈페이지를 통해 접수된 고객의 문의 내용입니다.</p>
            </div>

            <!-- Content -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; width: 120px; color: #666; font-weight: bold;">이름</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;"><strong>${name}</strong></td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">연락처</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${phone}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">이메일</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #00f0ff; text-decoration: none;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">여행 일정</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${date} (${duration})</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">인원</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${pax}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">숙소 선호</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333; text-transform: capitalize;">${accommodation}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">희망 방문지</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${destinations}</td>
                </tr>
            </table>

            <!-- Message Box -->
            <div style="background-color: #f7f9fc; padding: 20px; border-radius: 8px; border-left: 4px solid #00f0ff;">
                <p style="margin: 0 0 10px 0; font-weight: bold; color: #555;">📝 추가 문의사항</p>
                <pre style="margin: 0; white-space: pre-wrap; font-family: inherit; color: #333;">${message}</pre>
            </div>

            <!-- Footer -->
            <div style="margin-top: 40px; text-align: center; color: #999; font-size: 12px;">
                <p>본 메일은 트립소다 카자흐스탄 홈페이지에서 발송되었습니다.</p>
            </div>
        </div>
    </div>
`,
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log('Email sent successfully')
      return res.status(200).json({ message: 'Success' })
    } catch (error) {
      console.error('Email send failed:', error)
      return res.status(500).json({ message: 'Failed to send email', error })
    }
  }

  res.setHeader('Allow', ['POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}

