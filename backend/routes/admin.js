const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Fake in-memory users (will match your real users)
let users = [];

// Middleware to protect admin routes
const adminOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, 'secret123');
    if (decoded.role !== 'admin') return res.status(403).json({ msg: "Admin access only" });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// Dashboard — shows stats + list of agents & extensions
router.get('/dashboard', adminOnly, (req, res) => {
  const farmers = users.filter(u => u.role === 'farmer').length;
  const agents = users.filter(u => u.role === 'agent').length;
  const extensions = users.filter(u => u.role === 'extension').length;
  const staff = users.filter(u => u.role === 'agent' || u.role === 'extension');

  res.json({
    stats: { farmers, agents, extensions, totalUsers: users.length },
    staff: staff.map(u => ({ id: u.id, username: u.username, phone: u.phone, role: u.role }))
  });
});

module.exports = router;
