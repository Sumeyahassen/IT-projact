require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const db = require("./config/db"); const User = require("./models/user")(db);;
const adminRoutes = require("./routes/admin")(users);
app.use("/api/admin", adminRoutes);
app.use(cors());
app.use(express.json());

// In-memory database
const connectDB = require('./config/db');

// Register
app.post('/api/auth/register', async (req, res) => {
  const { username, phone, password, role = 'farmer' } = req.body;
  if (users.find(u => u.phone === phone)) return res.status(400).json({msg:"Phone exists"});
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length+1, username, phone, password: hashed, role };
  users.push(user);
  const token = jwt.sign({id:user.id, role:user.role}, 'secret123', {expiresIn:'7d'});
  res.json({token, user:{id:user.id, username, phone, role}});
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { phone, password } = req.body;
  const user = users.find(u => u.phone === phone);
  if (!user || !await bcrypt.compare(password, user.password))
    return res.status(401).json({msg:"Wrong credentials"});
  const token = jwt.sign({id:user.id, role:user.role}, 'secret123', {expiresIn:'7d'});
  res.json({token, user:{id:user.id, username:user.username, phone, role:user.role}});
});

// Live Weather
app.get('/api/weather/all', async (req, res) => {
  const regions = [
    {id:1,name:"Addis Ababa",lat:9.03,lon:38.74}, {id:2,name:"Afar",lat:11.75,lon:41.43},
    {id:3,name:"Amhara",lat:11.66,lon:37.96}, {id:4,name:"Benishangul-Gumuz",lat:10.52,lon:35.30},
    {id:5,name:"Dire Dawa",lat:9.60,lon:41.87}, {id:6,name:"Gambela",lat:8.25,lon:34.59},
    {id:7,name:"Harari",lat:9.31,lon:42.12}, {id:8,name:"Oromia",lat:7.20,lon:39.50},
    {id:9,name:"Somali",lat:6.00,lon:44.00}, {id:10,name:"Tigray",lat:13.50,lon:39.00},
    {id:11,name:"SNNPR",lat:6.50,lon:36.80}, {id:12,name:"Sidama",lat:6.70,lon:38.40}
  ];

  try {
    const data = await Promise.all(regions.map(async r => {
      try {
        const {data:w} = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${r.lat}&lon=${r.lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        return {id:r.id,name:r.name,temp:Math.round(w.main.temp),desc:w.weather[0].description};
      } catch { return {id:r.id,name:r.name,temp:"N/A"}; }
    }));
    res.json(data);
  } catch { res.status(500).json({msg:"Weather down"}); }
});

app.get('/', (req, res) => res.json({msg:"Ethiopia Agri API – LIVE"}));

app.listen(5000, () => console.log('Server running → http://localhost:5000'));
