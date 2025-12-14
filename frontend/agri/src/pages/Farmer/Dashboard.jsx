import { useEffect, useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/layout/Layout';

export default function FarmerDashboard() {
  const [prices, setPrices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-green-800 mb-8">Farmer Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Current Market Prices</h2>
        {prices.length === 0 ? (
          <p className="text-gray-600">No prices available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map(p => (
              <div key={p.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-bold">{p.product_name}</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{p.price_per_kg} ETB/kg</p>
                <p className="text-gray-600">Region: {p.region}</p>
                <p className="text-sm text-gray-500 mt-2">Updated by: {p.agent?.full_name || 'Agent'}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Extension Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-600">No notifications yet.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map(n => (
              <div key={n.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold">{n.title}</h3>
                <p className="text-gray-700 mt-2">{n.message}</p>
                {n.region && <p className="text-sm text-gray-500 mt-2">Region: {n.region}</p>}
                <p className="text-sm text-gray-500">From: {n.extension?.full_name || 'Extension Officer'}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}