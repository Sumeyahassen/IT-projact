const { ProductPrice, User } = require('../models');

// GET latest prices - Available to all authenticated users
exports.getLatestPrices = async (req, res) => {
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
          attributes: ['full_name', 'phone_number'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching prices', error: error.message });
  }
};

// POST new price - Only agents can do this
exports.createPrice = async (req, res) => {
  try {
    // Check role from JWT (set by verifyToken middleware)
    if (req.user.role !== 'agent') {
      return res.status(403).json({ message: 'Forbidden: Only agents can update prices' });
    }

    const { product_name, price_per_kg, region } = req.body;

    if (!product_name || !price_per_kg || !region) {
      return res.status(400).json({ message: 'product_name, price_per_kg, and region are required' });
    }

    // Create the new price record
    const newPrice = await ProductPrice.create({
      product_name,
      price_per_kg,
      region,
      updated_by: req.user.id,  // Agent's user ID from token
    });

    // Return the price with agent info
    const priceWithAgent = await ProductPrice.findByPk(newPrice.id, {
      include: [
        {
          model: User,
          as: 'agent',
          attributes: ['full_name'],
        },
      ],
    });

    res.status(201).json({
      message: 'Price updated successfully',
      price: priceWithAgent,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating price', error: error.message });
  }
};