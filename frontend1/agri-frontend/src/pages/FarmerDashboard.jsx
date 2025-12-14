import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';

export default function FarmerDashboard() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/weather/all`)
      .then(res => setWeather(res.data))
      .catch(() => setWeather([]));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-12">
      <h1 className="text-6xl font-bold text-center mb-12 text-green-800">Farmer Dashboard</h1>
      <p className="text-3xl text-center mb-16 text-gray-700">Real-time Weather & Market Info</p>

      <h2 className="text-5xl font-bold text-center my-20 text-green-800">Live Weather — All 12 Regions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {weather.map(w => <WeatherCard key={w.id} data={w} />)}
      </div>

      <div className="text-center mt-20">
        <p className="text-3xl text-gray-600">Prices & Knowledge coming soon...</p>
      </div>
    </div>
  );
}