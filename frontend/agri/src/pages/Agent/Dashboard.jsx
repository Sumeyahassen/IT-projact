import { useState, useEffect } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function AgentDashboard() {
  const [prices, setPrices] = useState([]);
  const [form, setForm] = useState({
    product_name: '',
    price_per_kg: '',
    region: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/prices');
      setPrices(res.data);
    } catch (err) {
      setMessage('Error loading prices');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (editingId) {
        await api.put(`/prices/${editingId}`, form);
        setMessage('Price updated successfully!');
      } else {
        await api.post('/prices', form);
        setMessage('Price added successfully!');
      }
      setForm({ product_name: '', price_per_kg: '', region: '' });
      setEditingId(null);
      fetchPrices();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error saving price');
    }
  };

  const handleEdit = (price) => {
    setForm({
      product_name: price.product_name,
      price_per_kg: price.price_per_kg,
      region: price.region
    });
    setEditingId(price.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this price?')) return;

    try {
      await api.delete(`/prices/${id}`);
      setMessage('Price deleted successfully');
      fetchPrices();
    } catch (err) {
      setMessage('Error deleting price');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ product_name: '', price_per_kg: '', region: '' });
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-20 text-2xl text-gray-600">Loading prices...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Agent Dashboard</h1>

        {/* Message */}
        {message && (
          <div className={`p-6 rounded-lg mb-8 text-center text-xl font-medium ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {/* Add / Edit Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-8">
            {editingId ? 'Edit Price' : 'Add New Market Price'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">Product Name</label>
              <input
                type="text"
                name="product_name"
                value={form.product_name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 focus:border-green-500 text-lg"
                placeholder="Teff, Maize, Wheat..."
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">Price per kg (ETB)</label>
              <input
                type="number"
                name="price_per_kg"
                value={form.price_per_kg}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 focus:border-green-500 text-lg"
                placeholder="52.00"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">Region</label>
              <input
                type="text"
                name="region"
                value={form.region}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 focus:border-green-500 text-lg"
                placeholder="Amhara, Oromia..."
              />
            </div>

            <div className="md:col-span-3 flex gap-6 mt-6">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition shadow-lg"
              >
                {editingId ? 'Update Price' : 'Add Price'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Current Prices List */}
        <h2 className="text-3xl font-bold text-green-800 mb-8">Current Market Prices</h2>

        {prices.length === 0 ? (
          <div className="bg-gray-100 p-12 rounded-xl text-center">
            <p className="text-2xl text-gray-600">No prices available yet.</p>
            <p className="text-gray-500 mt-4">Add your first price above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {prices.map(p => (
              <div key={p.id} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{p.product_name}</h3>
                <p className="text-4xl font-bold text-green-600 mb-2">{p.price_per_kg} ETB/kg</p>
                <p className="text-gray-600 mb-1">Region: {p.region}</p>
                <p className="text-sm text-gray-500 mb-6">By: {p.agent?.full_name || 'Agent'}</p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 bg-red-400 hover:bg-red-500 text-white py-2 rounded-lg font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}