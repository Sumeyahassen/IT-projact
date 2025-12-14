import { useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/layout/Layout';

export default function AgentDashboard() {
  const [form, setForm] = useState({
    product_name: '',
    price_per_kg: '',
    region: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/prices', form);
      setMessage('Price updated successfully!');
      setForm({ product_name: '', price_per_kg: '', region: '' });
    } catch (err) {
      setMessage('Error updating price');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-green-800 mb-8">Agent Dashboard</h1>

      <div className="bg-white p-8 rounded-lg shadow max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">Update Market Price</h2>

        {message && (
          <div className={`p-4 rounded mb-6 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600"
              placeholder="Teff, Maize, Wheat..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price per kg (ETB)</label>
            <input
              type="number"
              name="price_per_kg"
              value={form.price_per_kg}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <input
              type="text"
              name="region"
              value={form.region}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600"
              placeholder="Amhara, Oromia, Tigray..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg"
          >
            Update Price
          </button>
        </form>
      </div>
    </Layout>
  );
}