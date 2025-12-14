import { useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/layout/Layout';

export default function ExtensionDashboard() {
  const [form, setForm] = useState({
    title: '',
    message: '',
    region: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notifications', form);
      setMessage('Notification sent successfully!');
      setForm({ title: '', message: '', region: '' });
    } catch (err) {
      setMessage('Error sending notification');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-green-800 mb-8">Extension Officer Dashboard</h1>

      <div className="bg-white p-8 rounded-lg shadow max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Send Farming Advice</h2>

        {message && (
          <div className={`p-4 rounded mb-6 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600"
              placeholder="e.g. Pest Alert"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600"
              placeholder="Write your farming tip or alert here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Region (optional - leave blank for all)</label>
            <input
              type="text"
              name="region"
              value={form.region}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600"
              placeholder="Oromia, Amhara, etc."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg"
          >
            Send Notification
          </button>
        </form>
      </div>
    </Layout>
  );
}