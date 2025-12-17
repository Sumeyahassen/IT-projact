const axios = require('axios');

// Ethiopian regions with latitude and longitude
const regions = {
  addis_ababa: { lat: 9.03, lon: 38.74 },
  amhara: { lat: 11.60, lon: 37.39 },
  oromia: { lat: 8.98, lon: 38.75 },
  tigray: { lat: 13.50, lon: 39.47 },
  southern_ethiopia: { lat: 6.30, lon: 36.90 },
  sidama: { lat: 6.83, lon: 38.10 },
  somali: { lat: 6.50, lon: 43.50 },
  benishangul_gumuz: { lat: 10.70, lon: 34.60 },
  gambella: { lat: 8.25, lon: 34.58 },
  afar: { lat: 11.75, lon: 41.00 },
  dire_dawa: { lat: 9.60, lon: 41.85 },
};

exports.getWeather = async (req, res) => {
  let { region } = req.query;

  if (!region) {
    return res.status(400).json({ message: 'Region is required' });
  }

  // Normalize region: spaces -> underscores, lowercase
  const key = region.toLowerCase().replace(/\s+/g, '_');

  if (!regions[key]) {
    return res.status(400).json({ message: `Weather data not available for ${region}` });
  }

  const { lat, lon } = regions[key];

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Weather service not configured' });
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
        lang: 'en',
      },
    });

    const data = response.data;

    res.json({
      region: region, // Keep the original label for frontend
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description:
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1),
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      pressure: data.main.pressure,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: `Weather data not available for ${region}` });
  }
};
