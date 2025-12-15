import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get('/notifications').then(res => setNotifications(res.data));
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">All Notifications</h1>
        {notifications.length === 0 ? (
          <p>No notifications yet.</p>
        ) : (
          <div className="space-y-6">
            {notifications.map(n => (
              <div key={n.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold">{n.title}</h3>
                <p className="mt-2">{n.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  From: {n.extension?.full_name} | Region: {n.region || 'All'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}