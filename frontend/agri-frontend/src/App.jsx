import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://it-projact.onrender.com/api';

function App() {
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [form, setForm] = useState({ username: '', phone: '', password: '', role: 'farmer' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) loginWithToken(token);
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`${API}/weather/all`);
      setWeather(res.data);
    } catch (err) { console.log("Weather error"); }
  };

  const loginWithToken = async (token) => {
    try {
      const res = await axios.get(`${API}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ role: 'admin' });
      setAdminStats(res.data.stats);
    } catch {
      setUser({ role: 'user' });
    }
  };

  const register = async () => {
    try {
      const res = await axios.post(`${API}/auth/register`, form);
      localStorage.setItem('token', res.data.token);
      setUser({ role: form.role });
      if (form.role === 'admin') setAdminStats({ farmers: 0, agents: 0, extensions: 0 });
      alert('Registered successfully!');
    } catch { alert('Failed'); }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, { phone: form.phone, password: form.password });
      localStorage.setItem('token', res.data.token);
      setUser({ role: res.data.user.role });
      if (res.data.user.role === 'admin') {
        const dash = await axios.get(`${API}/admin/dashboard`, { headers: { Authorization: `Bearer ${res.data.token}` } });
        setAdminStats(dash.data.stats);
      }
      alert('Login successful!');
    } catch { alert('Wrong phone/password'); }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAdminStats(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-center my-12 text-green-800">
          Ethiopian Agriculture Platform
        </h1>

        {!user ? (
          <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-12">
            <h2 className="text-4xl font-bold text-center mb-10">Welcome</h2>
            <input className="w-full p-5 mb-5 border-2 rounded-xl text-lg" placeholder="Name" onChange={e => setForm(f => ({...f, username: e.target.value}))} />
            <input className="w-full p-5 mb-5 border-2 rounded-xl text-lg" placeholder="Phone (09..)" onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
            <input type="password" className="w-full p-5 mb-8 border-2 rounded-xl text-lg" placeholder="Password" onChange={e => setForm(f => ({...f, password: e.target.value}))} />
            <div className="grid grid-cols-2 gap-6">
              <button onClick={register} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl text-2xl">Register</button>
              <button onClick={login} className="bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-xl text-2xl">Login</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center my-10">
              <p className="text-4xl font-bold">Welcome, {user.role === 'admin' ? 'ADMIN' : 'User'}</p>
              <button onClick={logout} className="mt-8 px-10 py-5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xl">Logout</button>
            </div>

            {user.role === 'admin' && adminStats && (
              <div className="bg-purple-100 rounded-3xl p-10 mb-12 text-center">
                <h2 className="text-5xl font-bold mb-8 text-purple-800">ADMIN DASHBOARD</h2>
                <div className="grid grid-cols-4 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-xl"><p className="text-6xl font-bold text-blue-600">{adminStats.farmers}</p><p className="text-2xl">Farmers</p></div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl"><p className="text-6xl font-bold text-yellow-600">{adminStats.agents}</p><p className="text-2xl">Agents</p></div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl"><p className="text-6xl font-bold text-green-600">{adminStats.extensions}</p><p className="text-2xl">Extensions</p></div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl"><p className="text-6xl font-bold text-purple-600">{adminStats.total}</p><p className="text-2xl">Total Users</p></div>
                </div>
              </div>
            )}

            <h2 className="text-5xl font-bold text-center my-16 text-green-800">Live Weather — Ethiopia</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {weather.map(w => (
                <div key={w.id} className="bg-white rounded-3xl shadow-2xl p-10 text-center hover:scale-105 transition">
                  <h3 className="text-3xl font-bold mb-6">{w.name}</h3>
                  <p className="text-8xl font-bold text-orange-600 my-8">{w.temp}°C</p>
                  <p className="text-2xl text-gray-700 capitalize">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
