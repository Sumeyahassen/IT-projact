const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const User = require('../models/user')(sequelize);

// Protect all admin routes
const adminOnly = (req, res, next) => {
  if (!req.headers.authorization?.startsWith('Bearer ')) 
    return res.status(401).json({ msg: "No token" });
  
  const token = req.headers.authorization.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') 
      return res.status(403).json({ msg: "Admin access only" });
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// ADMIN DASHBOARD — see stats + list agents/extensions
router.get('/dashboard', adminOnly, async (req, res) => {
  try {
    const [farmers, agents, extensions] = await Promise.all([
      User.count({ where: { role: 'farmer' } }),
      User.count({ where: { role: 'agent' } }),
      User.count({ where: { role: 'extension' } })
    ]);

    const staff = await User.findAll({
      where: { role: ['agent', 'extension'] },
      attributes: ['id', 'username', 'phone', 'role', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      stats: { farmers, agents, extensions, totalUsers: farmers + agents + extensions + 1 },
      staff
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
