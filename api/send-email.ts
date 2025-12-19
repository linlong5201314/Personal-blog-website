import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { to, from, name, subject, message } = req.body

  const transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
      user: 'm13136064359@163.com',
      pass: 'XSTKpwH3WgtcPmiP',
    },
  })

  try {
    await transporter.sendMail({
      from: '"林龙的个人网站" <m13136064359@163.com>',
      to: to,
      subject: `[网站留言] ${subject} - 来自 ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">新的网站留言</h2>
          <p><strong>发送者：</strong>${name}</p>
          <p><strong>邮箱：</strong>${from}</p>
          <p><strong>主题：</strong>${subject}</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p><strong>消息内容：</strong></p>
          <p style="white-space: pre-wrap; background: #f3f4f6; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
}
