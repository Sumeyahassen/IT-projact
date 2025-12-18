import { useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function AskQuestion() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await api.post('/questions', { question });
      setMessage('Your question has been sent to extension officers!');
      setQuestion('');
    } catch (err) {
      setError('Failed to send question. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Ask Extension Officer</h1>

        <p className="text-xl text-gray-700 mb-10">
          Have a farming question? Ask our extension officers — they will respond with advice!
        </p>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Your Question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                rows="8"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-lg resize-none"
                placeholder="e.g. How to control fall armyworm in maize? When to plant teff in my area?"
              />
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-600 mb-4">
                Your name: <span className="font-semibold">{user.full_name}</span> |
                Region: <span className="font-semibold">{user.region}</span>
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-lg text-xl transition disabled:opacity-70"
              >
                {loading ? 'Sending Question...' : 'Send Question'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}