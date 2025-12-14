const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/authMiddleware');

// Create notification - only extension
router.post('/', verifyToken, notificationController.createNotification);

// Get all notifications - all authenticated users
router.get('/', verifyToken, notificationController.getNotifications);

module.exports = router;