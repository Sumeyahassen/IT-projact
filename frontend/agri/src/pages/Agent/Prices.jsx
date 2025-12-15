import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function AgentPrices() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/prices')
      .then(res => setPrices(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Layout><div className="text-center mt-20 text-2xl">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Current Market Prices</h1>

        {prices.length === 0 ? (
          <p className="text-gray-600 text-xl">No prices available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prices.map(p => (
              <div key={p.id} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold">{p.product_name}</h3>
                <p className="text-4xl font-bold text-green-600 mt-4">{p.price_per_kg} ETB/kg</p>
                <p className="text-gray-600 mt-2">Region: {p.region}</p>
                <p className="text-sm text-gray-500 mt-4">By: {p.agent?.full_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}