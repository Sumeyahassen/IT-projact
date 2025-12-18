import { useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';
import { ETHIOPIAN_REGIONS } from '../../components/regions.js';
export default function SendSMS() {
  const [form, setForm] = useState({
    message: '',
    region: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return;

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await api.post('/sms/emergency', form);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send SMS');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Send Emergency SMS</h1>

        <p className="text-xl text-gray-700 mb-10">
          Send critical alerts (drought, flood, pest outbreak) to farmers instantly.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8">
            <p className="font-bold">SMS Sent Successfully!</p>
            <p>Sent to: {result.total_sent_to || result.sent_to}</p>
            {result.results && (
              <details className="mt-4">
                <summary className="cursor-pointer font-medium">View Details</summary>
                <ul className="mt-2 text-sm">
                  {result.results.map((r, i) => (
                    <li key={i}>
                      {r.name || r.phone}: {r.status}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Emergency Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="8"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 text-lg resize-none"
                placeholder="e.g. Heavy flood expected in Oromia. Move livestock to higher ground immediately."
              />
            </div>

            <div>
  <label className="block text-lg font-medium text-gray-700 mb-3">
    Region (optional)
  </label>
  <select
    name="region"
    value={form.region}
    onChange={handleChange}
    className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 text-lg bg-white"
  >
    {ETHIOPIAN_REGIONS.map((region) => (
      <option key={region.value} value={region.value}>
        {region.label}
      </option>
    ))}
  </select>
</div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-lg text-2xl transition disabled:opacity-70 shadow-lg"
              >
                {loading ? 'Sending SMS...' : '🚨 Send Emergency Alert'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}