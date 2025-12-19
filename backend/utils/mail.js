const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: "Finance Tracker <" + process.env.EMAIL_USER + ">",
      to: to,
      subject: subject,
      text: text,
    });

    console.log("EMAIL SENT:", info.response);
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    throw err;
  }
}

module.exports = sendMail;