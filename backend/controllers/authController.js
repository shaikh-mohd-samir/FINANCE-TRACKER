const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// signup
exports.signupRequest = async (req, res) => {
  try {
    console.log("SIGNUP BODY 👉", req.body);

    const { name, email, password } = req.body;

    // validate ALL fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,            
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("SIGNUP ERROR ❌", err.message);
    res.status(500).json({ message: err.message });
  }
};
// verify user dummy
exports.verifySignup = async (req, res) => {
  res.json({ message: "Signup verified" });
};

// signin
exports.signin = async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);

    const {name, email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("USER FOUND 👉", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH 👉", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //CREATE TOKEN
    const token = jwt.sign(
      { 
        id: user._id,
        username:user.username,
        email:user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //SEND TOKEN + USER
    res.json({
      token,
      user: {
        id: user._id,
        username:user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("SIGNIN ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
};

// forgot password
exports.forgot = async (req, res) => {
  res.json({ message: "OTP sent" });
};

// reset password
exports.reset = async (req, res) => {
  res.json({ message: "Password reset" });
};

// change password
exports.changePassword = async (req, res) => {
  res.json({ message: "Password changed" });
};