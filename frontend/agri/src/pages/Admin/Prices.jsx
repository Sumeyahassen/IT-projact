import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function AdminPrices() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    api.get('/prices').then(res => setPrices(res.data));
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">All Market Prices</h1>
        {prices.length === 0 ? (
          <p>No prices yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {prices.map(p => (
              <div key={p.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold">{p.product_name}</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{p.price_per_kg} ETB/kg</p>
                <p>Region: {p.region}</p>
                <p className="text-sm text-gray-500">By: {p.agent?.full_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}