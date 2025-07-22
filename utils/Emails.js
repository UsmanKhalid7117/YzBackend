const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: receiverEmail,
      subject,
      html: body,
    });
    console.log("✅ Email sent to:", receiverEmail);
  } catch (error) {
    console.error("❌ Error sending email:", error); // ← This will help you debug
    throw error;
  }
};
