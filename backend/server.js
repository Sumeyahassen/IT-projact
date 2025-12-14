require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index');
const app = express();
const PORT = process.env.PORT || 5000;
app.use('/api/notifications', require('./routes/notificationRoutes'));
// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🌾 Agri Project Backend is Running!' });
});
const { verifyToken, requireAdmin } = require('./middleware/authMiddleware');

// Protected test route - only admin
app.get('/api/admin/test', verifyToken, requireAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin! This route is protected!', user: req.user });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/prices', require('./routes/priceRoutes'));
// Start server with database connection
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    await sequelize.sync({ alter: false }); // Safe sync - keeps existing data
    console.log('✅ Models synced successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error.message);
    process.exit(1);
  }
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'LOADED' : 'MISSING');
}

startServer();
