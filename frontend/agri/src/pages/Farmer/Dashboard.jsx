import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function FarmerDashboard() {
  const [prices, setPrices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceRes, notifRes] = await Promise.all([
          api.get('/prices'),
          api.get('/notifications')
        ]);
        setPrices(priceRes.data);
        setNotifications(notifRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Layout><div className="text-center mt-20 text-2xl">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Welcome, {user.full_name}
        </h1>
        <p className="text-xl text-gray-600 mb-10">Your Region: {user.region}</p>

        {/* Market Prices Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Current Market Prices</h2>
          {prices.length === 0 ? (
            <p className="text-gray-600">No prices available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prices.map(p => (
                <div key={p.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
                  <h3 className="text-2xl font-bold text-gray-800">{p.product_name}</h3>
                  <p className="text-4xl font-bold text-green-600 mt-4">{p.price_per_kg} ETB/kg</p>
                  <p className="text-gray-600 mt-2">Region: {p.region}</p>
                  <p className="text-sm text-gray-500 mt-4">Updated by: {p.agent?.full_name || 'Agent'}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Notifications Section */}
        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-6">Latest Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-600">No notifications yet.</p>
          ) : (
            <div className="space-y-6">
              {notifications.map(n => (
                <div key={n.id} className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-green-800">{n.title}</h3>
                  <p className="text-gray-700 mt-4">{n.message}</p>
                  {n.region && <p className="text-sm text-gray-500 mt-4">Region: {n.region}</p>}
                  <p className="text-sm text-gray-500">From: {n.extension?.full_name || 'Extension Officer'}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}