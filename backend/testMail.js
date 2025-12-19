require("dotenv").config();
const sendMail = require("./utils/mail");

sendMail(
  "sameershk8433@gmail.com",
  "Mail Test",
  "If you received this email, nodemailer is working correctly."
);