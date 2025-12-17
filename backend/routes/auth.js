const auth = require("../middleware/auth")
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const {
  signupRequest,
  verifySignup,
  signin,
  forgot,
  reset,
  changePassword
} = require("../controllers/authController");

router.post("/signup-request", signupRequest);
router.post("/verify-signup", verifySignup);
router.post("/signin", signin);
router.post("/forgot", forgot);
router.post("/reset", reset);
router.post("/change-password", changePassword);

router.get("/me", auth, async (req, res) => {
  try {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    })
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" })
  }
})

module.exports = router;