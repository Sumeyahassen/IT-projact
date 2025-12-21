import { useEffect, useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/layout/Layout';

export default function SentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    message: '',
    region: ''
  });
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error('Error loading notifications:', err);
      setActionMessage('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (notification) => {
    setEditingId(notification.id);
    setForm({
      title: notification.title,
      message: notification.message,
      region: notification.region || ''
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionMessage('');

    try {
      await api.put(`/notifications/${editingId}`, form);
      setActionMessage('Notification updated successfully!');
      setEditingId(null);
      setForm({ title: '', message: '', region: '' });
      fetchNotifications();
    } catch (err) {
      setActionMessage('Error updating notification');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;

    setActionMessage('');
    try {
      await api.delete(`/notifications/${id}`);
      setActionMessage('Notification deleted successfully');
      fetchNotifications();
    } catch (err) {
      setActionMessage('Error deleting notification');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: '', message: '', region: '' });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-3xl text-gray-600">Loading sent notifications...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-12 text-center">
          My Sent Notifications
        </h1>

        {/* Action Message */}
        {actionMessage && (
          <div className={`p-6 rounded-xl mb-10 text-center text-xl font-medium shadow-lg ${
            actionMessage.includes('successfully')
              ? 'bg-green-100 text-green-700 border-2 border-green-500'
              : 'bg-red-100 text-red-700 border-2 border-red-500'
          }`}>
            {actionMessage}
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="bg-gray-100 p-16 rounded-2xl text-center shadow-lg">
            <p className="text-2xl text-gray-600 mb-4">
              You haven't sent any notifications yet.
            </p>
            <p className="text-lg text-gray-500">
              Go to your dashboard and send your first farming advice!
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300"
              >
                {editingId === n.id ? (
                  // Edit Form
                  <form onSubmit={handleUpdate} className="space-y-8">
                    <div>
                      <label className="block text-xl font-bold text-gray-800 mb-3">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-2xl font-bold focus:ring-4 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xl font-bold text-gray-800 mb-3">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows="8"
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg resize-none focus:ring-4 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xl font-bold text-gray-800 mb-3">
                        Region (optional)
                      </label>
                      <input
                        type="text"
                        name="region"
                        value={form.region}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:ring-4 focus:ring-green-500"
                        placeholder="Leave blank for all regions"
                      />
                    </div>

                    <div className="flex gap-6">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-xl text-xl shadow-lg transition"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-10 rounded-xl text-xl shadow-lg transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // Normal View
                  <>
                    <h3 className="text-3xl font-bold text-green-800 mb-6">{n.title}</h3>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">{n.message}</p>

                    <div className="flex flex-wrap gap-6 text-lg mb-10">
                      {n.region && (
                        <span className="bg-blue-100 text-blue-800 px-5 py-3 rounded-full font-medium">
                          📍 Sent to: {n.region}
                        </span>
                      )}
                      <span className="bg-purple-100 text-purple-800 px-5 py-3 rounded-full font-medium">
                        👨‍🌾 From: {n.extension?.full_name || 'You'}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-5 py-3 rounded-full">
                        📅 Sent on: {new Date(n.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>

                    <div className="flex gap-6">
                      <button
                        onClick={() => handleEdit(n)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-md"
                      >
                        Edit Notification
                      </button>
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-md"
                      >
                        Delete Notification
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}