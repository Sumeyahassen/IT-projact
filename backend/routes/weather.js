const express = require('express');
const axios = require('axios');
const router = express.Router();

const regions = [
  {id:1,name:"Addis Ababa",lat:9.03,lon:38.74},
  {id:2,name:"Afar",lat:11.75,lon:41.43},
  {id:3,name:"Amhara",lat:11.66,lon:37.96},
  {id:4,name:"Benishangul-Gumuz",lat:10.52,lon:35.30},
  {id:5,name:"Dire Dawa",lat:9.60,lon:41.87},
  {id:6,name:"Gambela",lat:8.25,lon:34.59},
  {id:7,name:"Harari",lat:9.31,lon:42.12},
  {id:8,name:"Oromia",lat:7.20,lon:39.50},
  {id:9,name:"Somali",lat:6.00,lon:44.00},
  {id:10,name:"Tigray",lat:13.50,lon:39.00},
  {id:11,name:"SNNPR",lat:6.50,lon:36.80},
  {id:12,name:"Sidama",lat:6.70,lon:38.40}
];

router.get('/all', async (req, res) => {
  try {
    const data = await Promise.all(regions.map(async r => {
      try {
        const {data: w} = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${r.lat}&lon=${r.lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        return {id:r.id,name:r.name,temp:Math.round(w.main.temp),desc:w.weather[0].description,icon:`https://openweathermap.org/img/wn/${w.weather[0].icon}.png`};
      } catch { return {id:r.id,name:r.name,temp:"N/A"}; }
    }));
    res.json(data);
  } catch { res.status(500).json({msg:"Weather down"}); }
});

module.exports = router;
