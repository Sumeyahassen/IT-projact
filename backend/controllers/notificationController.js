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
      region: region || null,
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
    console.error('Error creating notification:', error);
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
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update notification - only the creator
exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, region } = req.body;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.created_by !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own notifications' });
    }

    await notification.update({
      title: title || notification.title,
      message: message || notification.message,
      region: region !== undefined ? region : notification.region,
    });

    const updatedNotification = await Notification.findByPk(id, {
      include: [{ model: User, as: 'extension', attributes: ['full_name'] }],
    });

    res.json({
      message: 'Notification updated successfully',
      notification: updatedNotification,
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete notification - only the creator
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.created_by !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own notifications' });
    }

    await notification.destroy();

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};