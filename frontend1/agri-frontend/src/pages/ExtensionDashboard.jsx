import { useState } from 'react';
import axios from 'axios';

export default function ExtensionDashboard() {
  const [post, setPost] = useState({ title: '', content: '', region: 'All' });

  const submit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/knowledge`, post, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Advice posted!');
    } catch { alert('Failed'); }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-12">
      <h1 className="text-6xl font-bold text-center mb-16 text-green-600">Extension Officer</h1>
      <div className="bg-white p-16 rounded-3xl shadow-2xl">
        <h2 className="text-4xl mb-12 text-center">Share Your Knowledge</h2>
        <input className="w-full p-6 border-2 rounded-xl mb-8 text-2xl" placeholder="Title" onChange={e => setPost(p => ({...p, title: e.target.value}))} />
        <textarea className="w-full p-6 border-2 rounded-xl mb-8 text-xl" rows="8" placeholder="Your advice..." onChange={e => setPost(p => ({...p, content: e.target.value}))}></textarea>
        <button onClick={submit} className="w-full bg-green-600 hover:bg-green-700 text-white py-8 rounded-2xl text-3xl font-bold">
          Post Advice
        </button>
      </div>
    </div>
  );
}