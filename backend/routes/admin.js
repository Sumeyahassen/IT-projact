module.exports = (users) => {
  const express = require('express');
  const router = express.Router();
  const jwt = require('jsonwebtoken');

  const regions = [
    {id:1,name:"Addis Ababa"}, {id:2,name:"Afar"}, {id:3,name:"Amhara"},
    {id:4,name:"Benishangul-Gumuz"}, {id:5,name:"Dire Dawa"}, {id:6,name:"Gambela"},
    {id:7,name:"Harari"}, {id:8,name:"Oromia"}, {id:9,name:"Somali"},
    {id:10,name:"Tigray"}, {id:11,name:"SNNPR"}, {id:12,name:"Sidama"}
  ];

  const adminOnly = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({msg:"No token"});
    try {
      const decoded = jwt.verify(token, 'secret123');
      if (decoded.role !== 'admin') return res.status(403).json({msg:"Admin only"});
      next();
    } catch { res.status(401).json({msg:"Bad token"}); }
  };

  router.get('/regions', (req, res) => res.json(regions));

  router.get('/dashboard', adminOnly, (req, res) => {
    const farmers = users.filter(u => u.role === 'farmer').length;
    const agents = users.filter(u => u.role === 'agent').length;
    const extensions = users.filter(u => u.role === 'extension').length;
    res.json({
      stats: { farmers, agents, extensions, total: users.length },
      regions,
      staff: users.filter(u => u.role !== 'farmer')
    });
  });

  return router;
};
