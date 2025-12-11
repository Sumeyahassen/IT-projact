const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const {
  updatePrice,
  getPrices,
  getFilters
} = require('../controllers/priceController');

// Public endpoints
router.get('/', getPrices);
router.get('/filters', getFilters);

// Agent only
router.post('/update', protect, restrictTo('agent'), updatePrice);

module.exports = router;
