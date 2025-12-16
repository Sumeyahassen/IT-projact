const express = require('express');
const router = express.Router();
const { ProductPrice, User } = require('../models');
const { verifyToken } = require('../middleware/authMiddleware');

// GET prices - PUBLIC (no token required — visible to everyone)
router.get('/', async (req, res) => {
  try {
    const { product_name, region } = req.query;

    let where = {};
    if (product_name) where.product_name = product_name;
    if (region) where.region = region;

    const prices = await ProductPrice.findAll({
      where,
      include: [
        {
          model: User,
          as: 'agent',
          attributes: ['full_name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Error fetching prices', error: error.message });
  }
});

// POST new price - only authenticated agents
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'agent') {
    return res.status(403).json({ message: 'Only agents can add prices' });
  }

  try {
    const { product_name, price_per_kg, region } = req.body;

    if (!product_name || !price_per_kg || !region) {
      return res.status(400).json({
        message: 'product_name, price_per_kg, and region are required',
      });
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
      message: 'Price added successfully',
      price: priceWithAgent,
    });
  } catch (error) {
    console.error('Error adding price:', error);
    res.status(500).json({ message: 'Error adding price', error: error.message });
  }
});

// PUT update existing price - only agents
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'agent') {
    return res.status(403).json({ message: 'Only agents can update prices' });
  }

  const { id } = req.params;
  const { product_name, price_per_kg, region } = req.body;

  try {
    const price = await ProductPrice.findByPk(id);
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    await price.update({
      product_name: product_name || price.product_name,
      price_per_kg: price_per_kg !== undefined ? price_per_kg : price.price_per_kg,
      region: region || price.region,
    });

    const updatedPrice = await ProductPrice.findByPk(id, {
      include: [{ model: User, as: 'agent', attributes: ['full_name'] }],
    });

    res.json({
      message: 'Price updated successfully',
      price: updatedPrice,
    });
  } catch (error) {
    console.error('Error updating price:', error);
    res.status(500).json({ message: 'Error updating price', error: error.message });
  }
});

// DELETE price - only agents
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'agent') {
    return res.status(403).json({ message: 'Only agents can delete prices' });
  }

  const { id } = req.params;

  try {
    const price = await ProductPrice.findByPk(id);
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    await price.destroy();

    res.json({ message: 'Price deleted successfully' });
  } catch (error) {
    console.error('Error deleting price:', error);
    res.status(500).json({ message: 'Error deleting price', error: error.message });
  }
});

module.exports = router;