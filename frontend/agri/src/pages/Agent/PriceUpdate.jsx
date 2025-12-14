import { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/layout/Layout';

export default function PriceUpdate() {
  const [form, setForm] = useState({
    product_name: '',
    price_per_kg: '',
    region: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:5000/api/prices', form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Price updated successfully!');
      setForm({ product_name: '', price_per_kg: '', region: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update price');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Update Market Price</h1>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="product_name"
                value={form.product_name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg"
                placeholder="e.g. Teff, Maize, Wheat, Coffee"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Price per kg (ETB)</label>
              <input
                type="number"
                name="price_per_kg"
                value={form.price_per_kg}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Region</label>
              <input
                type="text"
                name="region"
                value={form.region}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg"
                placeholder="e.g. Amhara, Oromia, Tigray"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-lg text-xl transition duration-200 disabled:opacity-70"
            >
              {loading ? 'Updating...' : 'Update Price'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}