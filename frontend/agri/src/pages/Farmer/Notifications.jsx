import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function FarmerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/notifications')
      .then(res => setNotifications(res.data))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Layout><div className="text-center mt-20 text-2xl">Loading notifications...</div></Layout>;

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Latest Notifications</h1>

        {notifications.length === 0 ? (
          <p className="text-gray-600 text-xl">No notifications yet.</p>
        ) : (
          <div className="space-y-8">
            {notifications.map(n => (
              <div key={n.id} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-green-800">{n.title}</h3>
                <p className="text-gray-700 mt-4 text-lg">{n.message}</p>
                {n.region && <p className="text-sm text-gray-500 mt-4">Region: {n.region}</p>}
                <p className="text-sm text-gray-500">From: {n.extension?.full_name || 'Extension Officer'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}