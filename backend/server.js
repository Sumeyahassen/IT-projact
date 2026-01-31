require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index');

const app = express();
const PORT = process.env.PORT || 5000;

// CRITICAL: Middleware FIRST — before ANY routes
app.use(cors());
app.use(express.json());  // Parses JSON body — must be here

// Routes — ALL after middleware
app.use('/api/local-products', require('./routes/localProductRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));

// FIXED: Only ONE line for /api/auth
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/prices', require('./routes/priceRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/sms', require('./routes/smsRoutes'));
app.use('/api/questions', require('./routes/farmerQuestionRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));

// Protected admin test route
const { verifyToken, requireAdmin } = require('./middleware/authMiddleware');
app.get('/api/admin/test', verifyToken, requireAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin! This route is protected!', user: req.user });
});

// Simple root route
app.get('/', (req, res) => {
  res.json({ message: '🌾 Agri Project Backend is Running!' });
});

// Start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // Sync models safely (adds columns without dropping data)
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced successfully');

    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'LOADED ✅' : 'MISSING ❌');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`Deployed URL: https://it-projact.onrender.com`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error.message);
    process.exit(1);
  }
}

startServer();