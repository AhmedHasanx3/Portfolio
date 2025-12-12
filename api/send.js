// api/send.js - The Vercel Serverless Function

// Note: Vercel's environment handles imports/setup,
// but we still need the nodemailer package.
import nodemailer from "nodemailer";

// 1. The handler function is the entry point
export default async function handler(req, res) {
  // 2. Vercel automatically passes the request body in req.body for POST requests
  const { name, email, message } = req.body;

  // 3. Simple method check (Vercel standard)
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    // 4. NODEMAILER TRANSPORTER - Using your standard Gmail settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // True for 465, False for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Removed large timeouts, as Vercel's network is typically fast/reliable.
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MY_EMAIL,
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    // 5. Success response using Vercel's response object
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    // 6. Detailed error logging for Vercel console
    return res
      .status(500)
      .json({
        success: false,
        message: "Email failed due to connection error. Check Vercel logs.",
      });
  }
}
