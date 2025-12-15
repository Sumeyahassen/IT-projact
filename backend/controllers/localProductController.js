const { LocalProduct, User } = require('../models');

exports.addLocalProduct = async (req, res) => {
  if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can add local products' });

  const { product_name, price_per_kg, region } = req.body;

  try {
    const product = await LocalProduct.create({
      product_name,
      price_per_kg,
      region,
      added_by: req.user.id,
    });

    res.status(201).json({ message: 'Local product added', product });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

exports.getLocalPrices = async (req, res) => {
  const { region } = req.query;

  const where = {};
  if (region) where.region = region;

  try {
    const prices = await LocalProduct.findAll({
      where,
      include: [{ model: User, as: 'farmer', attributes: ['full_name'] }],
      order: [['createdAt', 'DESC']],
    });

    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};