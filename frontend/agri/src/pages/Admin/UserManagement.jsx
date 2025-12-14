import { useEffect, useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/layout/Layout';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    full_name: '', phone_number: '', region: '', role: 'farmer', password: ''
  });
  const [editingId, setEditingId] = useState(null);

  const regions = [
    'Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Central Ethiopia',
    'Dire Dawa', 'Gambela', 'Harari', 'Oromia', 'Sidama', 'Somali',
    'South Ethiopia', 'South West Ethiopia', 'Tigray'
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, form);
      } else {
        await api.post('/users', form);
      }
      fetchUsers();
      setForm({ full_name: '', phone_number: '', region: '', role: 'farmer', password: '' });
      setEditingId(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const handleEdit = (user) => {
    setForm({
      full_name: user.full_name,
      phone_number: user.phone_number,
      region: user.region,
      role: user.role,
      password: ''
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      await api.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-green-800 mb-8">Admin - User Management</h1>

      {/* Form */}
      <div className="bg-white p-8 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-6">{editingId ? 'Edit' : 'Add'} User</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} required className="w-full px-4 py-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input type="text" value={form.phone_number} onChange={e => setForm({...form, phone_number: e.target.value})} required className="w-full px-4 py-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <select value={form.region} onChange={e => setForm({...form, region: e.target.value})} required className="w-full px-4 py-3 border rounded-lg">
              <option value="">Select region</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-4 py-3 border rounded-lg">
              {['farmer', 'agent', 'extension'].map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
            </select>
          </div>
          {!editingId && (
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="w-full px-4 py-3 border rounded-lg" />
            </div>
          )}
          <div className="md:col-span-2">
            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg">
              {editingId ? 'Update User' : 'Add User'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm({}); }} className="ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">All Users</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Region</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.full_name}</td>
                <td className="p-3">{u.phone_number}</td>
                <td className="p-3">{u.region}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">
                  <button onClick={() => handleEdit(u)} className="text-blue-600 mr-4">Edit</button>
                  <button onClick={() => handleDelete(u.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}