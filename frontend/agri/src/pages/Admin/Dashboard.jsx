import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-700 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome, {user.full_name}</p>
      </header>
      <div className="p-8">
        <h2 className="text-3xl mb-6">All Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(u => (
            <div key={u.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold">{u.full_name}</h3>
              <p>Phone: {u.phone_number}</p>
              <p>Region: {u.region}</p>
              <p className="capitalize">Role: {u.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}