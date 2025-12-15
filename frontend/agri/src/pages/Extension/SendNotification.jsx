import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function SentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/notifications');
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) return <Layout><div className="text-center mt-20 text-2xl">Loading sent notifications...</div></Layout>;

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Sent Notifications</h1>

        {notifications.length === 0 ? (
          <p className="text-gray-600 text-xl">You haven't sent any notifications yet.</p>
        ) : (
          <div className="space-y-8">
            {notifications.map(n => (
              <div key={n.id} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-green-800">{n.title}</h3>
                <p className="text-gray-700 mt-4 text-lg">{n.message}</p>
                {n.region && <p className="text-sm text-gray-500 mt-4">Sent to: {n.region}</p>}
                <p className="text-sm text-gray-500">Sent on: {new Date(n.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}