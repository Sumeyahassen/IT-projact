const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.warn('Warning: OPENWEATHER_API_KEY not set in .env – weather will not work');
}

// Coordinates for major cities in each region (accurate 2025)
const regionCoords = {
  1: { name: "Addis Ababa", lat: 9.03, lon: 38.74 },
  2: { name: "Afar", lat: 11.75, lon: 41.43 },
  3: { name: "Amhara", lat: 11.66, lon: 37.96 },
  4: { name: "Benishangul-Gumuz", lat: 10.52, lon: 35.30 },
  5: { name: "Dire Dawa", lat: 9.60, lon: 41.87 },
  6: { name: "Gambela", lat: 8.25, lon: 34.59 },
  7: { name: "Harari", lat: 9.31, lon: 42.12 },
  8: { name: "Oromia", lat: 7.20, lon: 39.50 },
  9: { name: "Somali", lat: 6.00, lon: 44.00 },
  10: { name: "Tigray", lat: 13.50, lon: 39.00 },
  11: { name: "SNNPR", lat: 6.50, lon: 36.80 },
  12: { name: "Sidama", lat: 6.70, lon: 38.40 }
};

exports.getWeatherByRegion = async (req, res) => {
  const { regionId } = req.params;

  const city = regionCoords[regionId];
  if (!city) {
    return res.status(404).json({ message: "Region not found" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;
    res.json({
      region: city.name,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind_speed: data.wind.speed,
      updated: new Date().toLocaleString('en-ET')
    });
  } catch (err) {
    res.status(500).json({ message: "Weather service unavailable" });
  }
};

exports.getAllWeather = async (req, res) => {
  try {
    const promises = Object.entries(regionCoords).map(async ([id, city]) => {
      try {
        const r = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
        );
        return {
          regionId: Number(id),
          region: city.name,
          temp: Math.round(r.data.main.temp),
          description: r.data.weather[0].description,
          icon: r.data.weather[0].icon
        };
      } catch {
        return { regionId: Number(id), region: city.name, temp: "N/A" };
      }
    });

    const results = await Promise.all(promises);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weather" });
  }
};
