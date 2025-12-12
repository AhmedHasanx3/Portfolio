// api/send.js - The Vercel Serverless Function with Manual CORS Fix

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // 1. Set CORS Headers for ALL responses
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ahmedhasanx3.github.io"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 2. Handle the CORS Preflight Request (OPTIONS)
  // The browser sends OPTIONS first to check permissions.
  if (req.method === "OPTIONS") {
    // Respond successfully immediately after setting headers
    return res.status(200).end();
  }

  // 3. Simple method check for POST request
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  // 4. Start POST request processing
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MY_EMAIL,
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    // Success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({
      success: false,
      message:
        "Email failed. Check Vercel logs for Authentication/Connection issues.",
    });
  }
}
