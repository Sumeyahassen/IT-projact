const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER - For farmer, agent, extension (self-registration)
exports.register = async (req, res) => {
  try {
    const { full_name, phone_number, region, role, password, confirm_password } = req.body;

    // Validation
    if (!full_name || !phone_number || !region || !role || !password || !confirm_password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!['farmer', 'agent', 'extension'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be farmer, agent, or extension' });
    }

    // Check if phone already exists
    const existingUser = await User.findOne({ where: { phone_number } });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      full_name,
      phone_number,
      region,
      role,
      password_hash,
    });

    res.status(201).json({
      message: 'Registration successful!',
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

// LOGIN - For all users (admin, farmer, agent, extension)
exports.login = async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    if (!phone_number || !password) {
      return res.status(400).json({ message: 'Phone number and password are required' });
    }

    // Find user
    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        region: user.region,
      },
      JWT_SECRET,
      { expiresIn: '365d' }  // Changed to 1 year for easy testing - change back to '7d' in production
    );

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        phone_number: user.phone_number,
        region: user.region,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};