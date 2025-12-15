const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, weatherController.getWeather);

module.exports = router;