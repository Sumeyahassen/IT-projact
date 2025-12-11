const db = require("../models");
const { User } = db;
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const register = async (req, res) => {
  try {
    const { username, phone, password, role, region } = req.body;

    const userExists = await User.findOne({ where: { phone } });
    if (userExists) return res.status(400).json({ message: 'Phone already registered' });

    const user = await User.create({
      username,
      phone,
      password,
      role: role || 'farmer',
      region: region || null,
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        phone: user.phone,
        role: user.role,
        region: user.region,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ where: { phone } });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: 'Invalid phone or password' });
    }

    const token = generateToken(user.id, user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        phone: user.phone,
        role: user.role,
        region: user.region,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };