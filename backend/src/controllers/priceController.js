const db = require("../models");
const { Price, Product, Region, User } = db;

// Agent: Update or create price
exports.updatePrice = async (req, res) => {
  try {
    const { productId, regionId, price } = req.body;
    const agentId = req.user.id;

    let priceRecord = await Price.findOne({
      where: { productId, regionId }
    });

    if (priceRecord) {
      priceRecord.price = price;
      priceRecord.updatedBy = agentId;
      priceRecord.recordedAt = new Date();
      await priceRecord.save();
    } else {
      priceRecord = await Price.create({
        productId,
        regionId,
        regionId,
        price,
        updatedBy: agentId
      });
    }

    res.json({ success: true, price: priceRecord });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Public: Get current prices
exports.getPrices = async (req, res) => {
  try {
    const { regionId, productId } = req.query;

    const where = {};
    if (regionId) where.regionId = regionId;
    if (productId) where.productId = productId;

    const prices = await Price.findAll({
      where,
      include: [
        { model: Product, attributes: ['name', 'amharicName', 'unit'] },
        { model: Region, attributes: ['name', 'amharicName'] },
        { model: User, as: 'agent', attributes: ['username', 'phone'] }
      ],
      order: [['recordedAt', 'DESC']]
    });

    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get dropdown lists
exports.getFilters = async (req, res) => {
  const [products, regions] = await Promise.all([
    Product.findAll({ attributes: ['id', 'name', 'amharicName', 'unit'] }),
    Region.findAll({ attributes: ['id', 'name', 'amharicName'] })
  ]);
  res.json({ products, regions });
};
