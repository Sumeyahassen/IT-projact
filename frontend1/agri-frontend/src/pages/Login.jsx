import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const role = res.data.user.role;
      alert('Login successful!');

      if (role === 'admin') navigate('/admin');
      else if (role === 'agent') navigate('/agent');
      else if (role === 'extension') navigate('/extension');
      else navigate('/farmer');
    } catch (err) {
      alert('Wrong phone or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-12">
        <h2 className="text-5xl font-bold text-center mb-12 text-green-800">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            placeholder="Phone (09xxxxxxxx or 0000000000 for admin)"
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

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-2xl text-3xl"
          >
            LOGIN
          </button>
        </form>

        <p className="text-center mt-10 text-xl">
          No account? <a href="/register" className="text-green-600 font-bold hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
}