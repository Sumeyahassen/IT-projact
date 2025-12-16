const AfricasTalking = require('africastalking');
const { User } = require('../models');

const username = process.env.AFRICASTALKING_USERNAME;
const apiKey = process.env.AFRICASTALKING_API_KEY;

const africastalking = AfricasTalking({ username, apiKey });
const sms = africastalking.SMS;

exports.sendEmergencySMS = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can send emergency SMS' });
  }

  const { message, region } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const where = { role: 'farmer' };
    if (region) where.region = region;

    const farmers = await User.findAll({
      where,
      attributes: ['phone_number', 'full_name']
    });

    if (farmers.length === 0) {
      return res.status(400).json({ message: 'No farmers found in this region' });
    }

    const results = [];

    for (const farmer of farmers) {
      // Format phone to international (Ethiopia)
      let to = farmer.phone_number;
      if (to.startsWith('0')) to = '+251' + to.slice(1);
      else if (to.startsWith('9')) to = '+251' + to;

      try {
        const response = await sms.send({
          to: [to],
          message: `🚨 EMERGENCY ALERT 🚨\n${message}\n\n- Ethiopian Agri Platform`,
          from: 'AgriAlert'  // Change to your approved sender ID in live mode
        });

        results.push({
          name: farmer.full_name,
          phone: to,
          status: 'sent',
          response: response
        });
      } catch (error) {
        results.push({
          name: farmer.full_name,
          phone: to,
          status: 'failed',
          error: error.message
        });
      }
    }

    res.json({
      message: 'Emergency SMS processing complete',
      total_sent_to: farmers.length,
      results
    });
  } catch (error) {
    console.error('SMS Error:', error);
    res.status(500).json({ message: 'Server error sending SMS', error: error.message });
  }
};