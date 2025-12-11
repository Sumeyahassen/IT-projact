// src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('../models'); // Load all models
const authRoutes = require('./routes/authRoutes');
const priceRoutes = require("./routes/priceRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express(); // ← app must be created here

// Middlewares
app.use(cors());
app.use(express.json());

// Routes –––––––––– Routes ––––––––––
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Ethiopia Agriculture Platform API – Running!' });
});

// Sync database and start server
const PORT = process.env.PORT || 5000;

db.sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL successfully');
    // Uncomment next line only in development if you want auto table update
    // return db.sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });