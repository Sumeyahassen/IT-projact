require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const authRoutes = require('./routes/auth');
const priceRoutes = require('./routes/price');
const weatherRoutes = require('./routes/weather');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => res.json({ msg: "Ethiopia Agri API – LIVE" }));

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
