const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const localProductController = require('../controllers/localProductController');

// POST - Farmers add local product
router.post('/', verifyToken, localProductController.addLocalProduct);

// GET - All users view local prices (by region)
router.get('/', verifyToken, localProductController.getLocalPrices);

module.exports = router;