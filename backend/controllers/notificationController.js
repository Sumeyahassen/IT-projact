const { Notification, User } = require('../models');

// Create notification - only extension officers
exports.createNotification = async (req, res) => {
  if (req.user.role !== 'extension') {
    return res.status(403).json({ message: 'Only extension officers can create notifications' });
  }

  try {
    const { title, message, region } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const notification = await Notification.create({
      title,
      message,
      region: region || null, // null = all regions
      created_by: req.user.id,
    });

    const fullNotification = await Notification.findByPk(notification.id, {
      include: [{ model: User, as: 'extension', attributes: ['full_name'] }],
    });

    res.status(201).json({
      message: 'Notification sent successfully',
      notification: fullNotification,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all notifications - any authenticated user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      include: [{ model: User, as: 'extension', attributes: ['full_name'] }],
      order: [['createdAt', 'DESC']],
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};