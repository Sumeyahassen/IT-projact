const { ProductPrice, User } = require('../models');const bcrypt = require('bcryptjs');

// GET all non-admin users (farmers, agents, extensions)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: ['farmer', 'agent', 'extension'] },
      attributes: ['id', 'full_name', 'phone_number', 'region', 'role', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// CREATE new user (admin only)
exports.createUser = async (req, res) => {
  try {
    const { full_name, phone_number, region, role, password } = req.body;

    if (!full_name || !phone_number || !region || !role || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['farmer', 'agent', 'extension'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existing = await User.findOne({ where: { phone_number } });
    if (existing) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name,
      phone_number,
      region,
      role,
      password_hash,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        phone_number: newUser.phone_number,
        region: newUser.region,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByPk(id);
    if (!user || user.role === 'admin') {
      return res.status(404).json({ message: 'User not found or cannot modify admin' });
    }

    if (updates.password) {
      updates.password_hash = await bcrypt.hash(updates.password, 10);
      delete updates.password;
    }

    await user.update(updates);

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user || user.role === 'admin') {
      return res.status(404).json({ message: 'User not found or cannot delete admin' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};