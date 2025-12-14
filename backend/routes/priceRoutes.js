const express = require('express');
const router = express.Router();
const { ProductPrice, User } = require('../models');
const { verifyToken } = require('../middleware/authMiddleware');

// GET prices - any authenticated user (farmers can view)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { product_name, region } = req.query;

    let where = {};
    if (product_name) where.product_name = product_name;
    if (region) where.region = region;

    const prices = await ProductPrice.findAll({
      where,
      include: [{ model: User, as: 'agent', attributes: ['full_name'] }],
      order: [['createdAt', 'DESC']],
    });

    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prices', error: error.message });
  }
});

// POST price - only agents
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'agent') {
    return res.status(403).json({ message: 'Only agents can update prices' });
  }

  try {
    const { product_name, price_per_kg, region } = req.body;

    if (!product_name || !price_per_kg || !region) {
      return res.status(400).json({ message: 'product_name, price_per_kg, and region are required' });
    }

    const newPrice = await ProductPrice.create({
      product_name,
      price_per_kg,
      region,
      updated_by: req.user.id,
    });

    const priceWithAgent = await ProductPrice.findByPk(newPrice.id, {
      include: [{ model: User, as: 'agent', attributes: ['full_name'] }],
    });

    res.status(201).json({
      message: 'Price updated successfully',
      price: priceWithAgent,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating price', error: error.message });
  }
});

module.exports = router;