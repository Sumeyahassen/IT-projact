const axios = require('axios');
const { User } = require('../models');

// Send emergency SMS - only admin
exports.sendEmergencySMS = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can send emergency SMS' });
  }

  try {
    const { message, region } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Find farmers
    const where = { role: 'farmer' };
    if (region) where.region = region;

    const farmers = await User.findAll({ where, attributes: ['phone_number'] });

    if (farmers.length === 0) {
      return res.status(400).json({ message: 'No farmers found in this region' });
    }

    const results = [];

    for (const farmer of farmers) {
      const phone = farmer.phone_number.startsWith('0') ? '251' + farmer.phone_number.slice(1) : farmer.phone_number;

      try {
        const response = await axios.post('https://sms.yegara.com/api/v1/send', {
          to: phone,
          message: `🚨 EMERGENCY: ${message}`,
          sender_id: process.env.YEGARA_SENDER_ID || 'AgriAlert',
          domain: process.env.YEGARA_DOMAIN,
        });

        results.push({ phone, status: 'sent', response: response.data });
      } catch (error) {
        results.push({ phone, status: 'failed', error: error.response?.data || error.message });
      }
    }

    res.json({
      message: 'Emergency SMS attempt completed',
      total: farmers.length,
      results,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};