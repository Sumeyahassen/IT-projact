const express = require('express');
const router = express.Router();
const smsController = require('../controllers/smsController');
const { verifyToken } = require('../middleware/authMiddleware');

// POST /api/sms/emergency - Send emergency SMS (only admin)
router.post('/emergency', verifyToken, smsController.sendEmergencySMS);

module.exports = router;