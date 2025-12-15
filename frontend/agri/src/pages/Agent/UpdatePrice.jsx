import { useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function UpdatePrice() {
  const [form, setForm] = useState({
    product_name: '',
    price_per_kg: '',
    region: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      await api.post('/prices', form);
      setSuccess('Price updated successfully!');
      setForm({ product_name: '', price_per_kg: '', region: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update price');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Update Market Price</h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Product Name
              </label>
              <input
                type="text"
                name="product_name"
                value={form.product_name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-lg"
                placeholder="e.g. Teff, Maize, Wheat, Coffee"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Price per kg (ETB)
              </label>
              <input
                type="number"
                name="price_per_kg"
                value={form.price_per_kg}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-lg"
                placeholder="e.g. 52.00"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Region
              </label>
              <input
                type="text"
                name="region"
                value={form.region}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-lg"
                placeholder="e.g. Amhara, Oromia, Tigray"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-lg text-xl transition disabled:opacity-70"
            >
              {loading ? 'Updating Price...' : 'Update Price'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}