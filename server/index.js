// index.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config(); // 🔥 REQUIRED ON RENDER

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("ENV CHECK:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS ? "LOADED" : "MISSING",
  to: process.env.MY_EMAIL,
});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ahmedhasanx3.github.io",
      "https://ahmedhasanx3.github.io/Portfolio",
    ],
  })
);

app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Explicitly set host
      port: 465, // Explicitly set port 465
      secure: true, // Explicitly set secure to true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }, // 🚨 CRITICAL ADDITION: Increase timeout to handle Render latency
      connectionTimeout: 20000, // 20 seconds (default is 10s)
      greetingTimeout: 10000, // 10 seconds
      socketTimeout: 30000, // 30 seconds
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MY_EMAIL,
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Email failed" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT || 5000);
});
