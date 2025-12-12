const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const User = require('../models/user')(sequelize);
const jwt = require('jsonwebtoken');

const token = (id, role) => jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: '7d'});

router.post('/register', async (req, res) => {
  try {
    const { username, phone, password, role = 'farmer' } = req.body;
    if (await User.findOne({ where: { phone } })) 
      return res.status(400).json({ message: 'Phone already used' });

    const user = await User.create({ username, phone, password, role });
    res.status(201).json({ token: token(user.id, user.role), user });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ where: { phone } });
    if (!user || !user.validPassword(password))
      return res.status(401).json({ message: 'Wrong phone or password' });

    res.json({ token: token(user.id, user.role), user });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
