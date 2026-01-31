const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 1. Forgot Password — send reset code via SMS
app.post('/api/auth/forgot-password', async (req, res) => {
  const { phone } = req.body;
  const user = users.find(u => u.phone === phone); // your in-memory users

  if (!user) return res.status(404).json({ msg: "Phone not found" });

  // Generate 6-digit code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetCode = resetCode; // save in user object
  user.resetCodeExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

  // Send SMS via Twilio
  const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  try {
    await client.messages.create({
      body: `Your password reset code is: ${resetCode}. Valid for 15 minutes.`,
      from: process.env.TWILIO_NUMBER, // your Twilio number
      to: phone.startsWith('+') ? phone : `+251${phone.replace(/^0/, '')}` // Ethiopia format
    });
    res.json({ msg: "Reset code sent to your phone" });
  } catch (err) {
    res.status(500).json({ msg: "SMS failed", error: err.message });
  }
});

// 2. Reset Password with code
app.post('/api/auth/reset-password', async (req, res) => {
  const { phone, code, newPassword } = req.body;
  const user = users.find(u => u.phone === phone);

  if (!user) return res.status(404).json({ msg: "User not found" });

  if (user.resetCode !== code || Date.now() > user.resetCodeExpiry) {
    return res.status(400).json({ msg: "Invalid or expired code" });
  }

  user.password = await bcrypt.hash(newPassword, 10); // hash new password
  delete user.resetCode;
  delete user.resetCodeExpiry;

  res.json({ msg: "Password reset successful! Please login." });
});
// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;