import { useEffect, useState } from "react";
import api from "../../services/api.js";
import Layout from "../../components/layout/Layout.jsx";
import AskQuestion from "./AskQuestion.jsx";

export default function FarmerDashboard() {
  const [prices, setPrices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [priceRes, notifRes] = await Promise.all([
          api.get("/prices"),
          api.get("/notifications"),
        ]);

        setPrices(priceRes.data);
        setNotifications(notifRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
useEffect(() => {
  const fetchWeather = async () => {
    try {
      const res = await api.get(`/weather?region=${user.region}`);
      setWeather(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setWeatherLoading(false);
    }
  };

  if (user.region) {
    fetchWeather();
  }
}, [user.region]);
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-2xl text-gray-600">
            Loading your dashboard...
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Welcome, {user.full_name || "Farmer"}
          </h1>
          <p className="text-xl text-gray-700">
            Region:{" "}
            <span className="font-semibold">
              {user.region || "Not specified"}
            </span>
          </p>
        </div>
  {/* Weather Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Current Weather in {user.region}
          </h2>
          {weatherLoading ? (
            <p className="text-gray-600">Loading weather...</p>
          ) : weather ? (
            <div className="bg-gradient-to-r from-blue-300 to-cyan-300 text-white p-8 rounded-2xl shadow-xl flex items-center gap-8">
              <img src={weather.icon} alt="weather" className="w-32 h-32" />
              <div>
                <p className="text-5xl font-bold">{weather.temperature}°C</p>
                <p className="text-2xl mt-2">{weather.description}</p>
                <p className="text-lg mt-4">
                  Feels like {weather.feels_like}°C
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                  <div>
                    <p className="font-semibold">Humidity</p>
                    <p>{weather.humidity}%</p>
                  </div>
                  <div>
                    <p className="font-semibold">Wind</p>
                    <p>{weather.wind_speed} m/s</p>
                  </div>
                  <div>
                    <p className="font-semibold">Pressure</p>
                    <p>{weather.pressure} hPa</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">
              Weather data not available for {user.region}
            </p>
          )}
        </section>
        {/* Current Market Prices Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8">
            Current Market Prices
          </h2>
          {prices.length === 0 ? (
            <div className="bg-gray-100 p-10 rounded-xl text-center">
              <p className="text-xl text-gray-600">
                No market prices available yet.
              </p>
              <p className="text-gray-500 mt-2">
                Agents will update prices soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {prices.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {p.product_name}
                  </h3>
                  <p className="text-4xl font-bold text-green-600 mb-2">
                    {p.price_per_kg}{" "}
                    <span className="text-lg font-normal">ETB/kg</span>
                  </p>
                  <p className="text-gray-600 mb-1">Region: {p.region}</p>
                  <p className="text-sm text-gray-500">
                    Updated by: {p.agent?.full_name || "Market Agent"}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Latest Notifications Section */}
        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-8">
            Latest Notifications & Advice
          </h2>
          {notifications.length === 0 ? (
            <div className="bg-gray-100 p-10 rounded-xl text-center">
              <p className="text-xl text-gray-600">No notifications yet.</p>
              <p className="text-gray-500 mt-2">
                Extension officers will send advice soon.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold text-green-800 mb-4">
                    {n.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    {n.message}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    {n.region && (
                      <span className="bg-blue-100 px-3 py-1 rounded-full">
                        Region: {n.region}
                      </span>
                    )}
                    <span className="bg-purple-100 px-3 py-1 rounded-full">
                      From: {n.extension?.full_name || "Extension Officer"}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
   

      </div>
    </Layout>
  );
}
