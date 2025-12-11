const express = require('express');
const router = express.Router();
const { getWeatherByRegion, getAllWeather } = require('../controllers/weatherController');

// Public – anyone can see weather
router.get('/region/:regionId', getWeatherByRegion);
router.get('/all', getAllWeather);

module.exports = router;
