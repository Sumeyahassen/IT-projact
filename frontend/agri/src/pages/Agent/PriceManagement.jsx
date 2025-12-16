import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function PriceManagement() {
  const [prices, setPrices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    product_name: '',
    price_per_kg: '',
    region: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await api.get('/prices');
      setPrices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (price) => {
    setEditing(price.id);
    setForm({
      product_name: price.product_name,
      price_per_kg: price.price_per_kg,
      region: price.region
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/prices/${editing}`, form);
      setEditing(null);
      setForm({ product_name: '', price_per_kg: '', region: '' });
      fetchPrices();
    } catch (err) {
      alert('Error updating price');
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ product_name: '', price_per_kg: '', region: '' });
  };

  if (loading) return <Layout><div className="text-center mt-20 text-2xl">Loading prices...</div></Layout>;

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Manage Market Prices</h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Current Prices</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-green-100">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price (ETB/kg)</th>
                  <th className="p-4">Region</th>
                  <th className="p-4">Updated By</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prices.map(p => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{p.product_name}</td>
                    <td className="p-4 font-bold">{p.price_per_kg}</td>
                    <td className="p-4">{p.region}</td>
                    <td className="p-4">{p.agent?.full_name || 'Agent'}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editing && (
            <div className="mt-12 bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Edit Price (ID: {editing})</h3>
              <form onSubmit={handleUpdate} className="space-y-6 max-w-lg">
                <input
                  type="text"
                  name="product_name"
                  value={form.product_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Product Name"
                />
                <input
                  type="number"
                  name="price_per_kg"
                  value={form.price_per_kg}
                  onChange={handleChange}
                  required
                  step="0.01"
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Price per kg"
                />
                <input
                  type="text"
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Region"
                />
                <div className="flex gap-4">
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
                    Save Changes
                  </button>
                  <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}