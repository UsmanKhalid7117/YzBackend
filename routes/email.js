// backend/routes/email.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,      // e.g. yzmobilelaptop@gmail.com
    pass: process.env.PASSWORD    // Gmail app password
  }
});

router.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    await transporter.sendMail({
      from: `"YZ Shop" <${process.env.EMAIL}>`,
      to,
      subject,
      html
    });

    console.log(`✅ Email sent to ${to}`);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
