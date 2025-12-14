import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'farmer'
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert('Passwords do not match!');
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username: form.username,
        phone: form.phone,
        password: form.password,
        role: form.role
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Registered successfully!');
      navigate('/' + form.role);
    } catch (err) {
      alert('Phone already exists or error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-12">
        <h2 className="text-5xl font-bold text-center mb-12 text-green-800">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-5 border-2 rounded-2xl text-xl"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Phone (09xxxxxxxx)"
            className="w-full p-5 border-2 rounded-2xl text-xl"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-5 border-2 rounded-2xl text-xl"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-5 border-2 rounded-2xl text-xl"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />

          <select
            className="w-full p-5 border-2 rounded-2xl text-xl"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="farmer">Farmer</option>
            <option value="agent">Market Agent</option>
            <option value="extension">Extension Officer</option>
            {/* NO ADMIN OPTION */}
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-2xl text-3xl"
          >
            REGISTER
          </button>
        </form>

        <p className="text-center mt-10 text-xl">
          Already have account? <a href="/login" className="text-green-600 font-bold hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
}