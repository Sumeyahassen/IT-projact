import { useEffect, useState } from 'react';
import WeatherCard from '../components/WeatherCard';

export default function Home() {
  const [weather, setWeather] = useState([]); // ← Always start as empty array

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/weather/all`)
      .then(res => res.json())
      .then(data => setWeather(data || []))
      .catch(err => {
        console.log("Weather failed:", err);
        setWeather([]);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-12 text-center">
      <h1 className="text-7xl font-bold text-green-800 mb-10">Ethiopian Agriculture Platform</h1>
      <p className="text-3xl mb-16 text-gray-700">Real-time market prices • Live weather • Expert advice</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20">
        {["Farmers", "Agents", "Extension Officers", "Admin"].map((role, i) => (
          <div key={i} className="bg-white p-10 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold text-green-700 mb-4">{role}</h3>
            <p className="text-xl">Join to access powerful tools</p>
          </div>
        ))}
      </div>

      <h2 className="text-5xl font-bold mb-12 text-green-800">Live Weather Preview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {weather.length === 0 ? (
          <p className="col-span-4 text-3xl text-gray-500">Loading weather...</p>
        ) : (
          weather.slice(0, 4).map(w => <WeatherCard key={w.id} data={w} />)
        )}
      </div>
    </div>
  );
}