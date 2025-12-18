const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Public stats endpoint - no authentication
router.get('/stats', userController.getPublicStats);

module.exports = router;