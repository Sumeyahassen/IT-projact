import { useState } from 'react';
import axios from 'axios';

export default function AgentDashboard() {
  const [form, setForm] = useState({ product: 'Teff', region: 'Oromia', price: '' });

  const handleSubmit = async () => {
    if (!form.price) return alert('Enter price');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/prices/update`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Price updated!');
    } catch { alert('Failed'); }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 text-center">
      <h1 className="text-6xl font-bold mb-16 text-yellow-600">Agent Dashboard</h1>
      <div className="bg-white p-16 rounded-3xl shadow-2xl">
        <h2 className="text-4xl mb-12">Update Market Price</h2>
        <input className="w-full p-6 border-2 rounded-xl mb-8 text-2xl" placeholder="Price in Birr" onChange={e => setForm(f => ({...f, price: e.target.value}))} />
        <button onClick={handleSubmit} className="bg-yellow-600 hover:bg-yellow-700 text-white py-8 px-20 rounded-2xl text-3xl font-bold">
          Update Price
        </button>
      </div>
    </div>
  );
}