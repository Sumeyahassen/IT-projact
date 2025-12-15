const axios = require('axios');

exports.getWeather = async (req, res) => {
  const { region } = req.query;

  if (!region) {
    return res.status(400).json({ message: 'Region is required' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Weather service not configured' });
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: `${region},ET`,  // ET = Ethiopia
        appid: apiKey,
        units: 'metric',    // Celsius
        lang: 'en'
      }
    });

    const data = response.data;

    res.json({
      region: data.name,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      pressure: data.main.pressure,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Weather data not available for this region' });
  }
};