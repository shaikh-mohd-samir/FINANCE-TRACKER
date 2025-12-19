const express = require("express");
const router = express.Router();

const {
  signupRequest,
  signin,
  forgot,
  reset,
  changePassword,
} = require("../controllers/authController");

// AUTH ROUTES
router.post("/signup", signupRequest);
router.post("/login", signin);
router.post("/forgot-password", forgot);
router.post("/reset-password", reset);
router.post("/change-password", changePassword);

module.exports = router;