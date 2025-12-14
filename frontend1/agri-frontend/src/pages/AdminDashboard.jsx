import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setStats(res.data.stats))
    .catch(() => alert('Admin only'));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-20 text-center">
      <h1 className="text-7xl font-bold mb-20 text-purple-800">ADMIN PANEL</h1>
      {stats && (
        <div className="grid grid-cols-4 gap-12">
          <div className="bg-blue-100 p-12 rounded-3xl shadow-2xl">
            <p className="text-8xl font-bold text-blue-700">{stats.farmers}</p>
            <p className="text-3xl mt-4">Farmers</p>
          </div>
          <div className="bg-yellow-100 p-12 rounded-3xl shadow-2xl">
            <p className="text-8xl font-bold text-yellow-700">{stats.agents}</p>
            <p className="text-3xl mt-4">Agents</p>
          </div>
          <div className="bg-green-100 p-12 rounded-3xl shadow-2xl">
            <p className="text-8xl font-bold text-green-700">{stats.extensions}</p>
            <p className="text-3xl mt-4">Extension</p>
          </div>
          <div className="bg-purple-100 p-12 rounded-3xl shadow-2xl">
            <p className="text-8xl font-bold text-purple-700">{stats.totalUsers}</p>
            <p className="text-3xl mt-4">Total</p>
          </div>
        </div>
      )}
    </div>
  );
}