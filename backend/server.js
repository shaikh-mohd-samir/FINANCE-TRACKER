const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const sendMail = require("./utils/mail"); // 👈 TEMP MAIL TEST

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

// DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    //TEMPORARY MAIL TEST (REMOVE AFTER TEST)
    await sendMail(
      process.env.EMAIL_USER,
      "Finance Tracker Test Mail",
      "If you received this, nodemailer is working 🎉"
    );
  })
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});