require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - MUST BE BEFORE ROUTES
app.use(cors());
app.use(express.json());  // ← This parses JSON body — critical!
app.use('/api/local-products', require('./routes/localProductRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🌾 Agri Project Backend is Running!' });
});

// Routes - ALL AFTER middleware
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/prices', require('./routes/priceRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/sms', require('./routes/smsRoutes'));
// Protected test route (optional)
const { verifyToken, requireAdmin } = require('./middleware/authMiddleware');
app.get('/api/admin/test', verifyToken, requireAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin! This route is protected!', user: req.user });
});

// Start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    await sequelize.sync({ alter: false });
    console.log('✅ Models synced successfully');

    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'LOADED ✅' : 'MISSING ❌');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error.message);
    process.exit(1);
  }
}

startServer();