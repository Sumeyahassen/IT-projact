import { useState, useEffect } from "react";
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function ExtensionDashboard() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    region: "",
  });
  const [questions, setQuestions] = useState([]); // ← Added state for questions
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch farmer questions when component loads
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error("Error loading farmer questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/notifications", form);
      setMessage("Notification sent successfully!");
      setForm({ title: "", message: "", region: "" });
    } catch (err) {
      setMessage("Error sending notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-12">
          Extension Officer Dashboard
        </h1>

        {/* Send Notification Form */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8">
            Send Farming Advice
          </h2>

          {message && (
            <div
              className={`p-6 rounded-lg mb-8 text-center text-xl font-medium ${
                message.includes("success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-600 text-lg"
                placeholder="e.g. Pest Alert in Oromia"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="8"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-600 text-lg resize-none"
                placeholder="Write your farming tip, pest alert, or advice here..."
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Region (optional - leave blank to send to all farmers)
              </label>
              <input
                type="text"
                name="region"
                value={form.region}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-600 text-lg"
                placeholder="e.g. Oromia, Amhara"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-lg text-xl transition disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </form>
        </div>

        {/* Farmer Questions Section */}
        <h2 className="text-3xl font-bold text-green-800 mb-10">
          Farmer Questions
        </h2>

        {questions.length === 0 ? (
          <div className="bg-gray-100 p-12 rounded-2xl text-center">
            <p className="text-2xl text-gray-600">No questions from farmers yet.</p>
            <p className="text-gray-500 mt-4">Farmers will ask questions here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {questions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
              >
                <p className="text-xl text-gray-800 mb-6 leading-relaxed">
                  {q.question}
                </p>

                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    <span className="font-medium">From:</span> {q.farmer?.full_name || 'Farmer'}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {q.farmer?.phone_number}
                  </p>
                  <p>
                    <span className="font-medium">Region:</span> {q.farmer?.region}
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
                    Asked on: {new Date(q.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {q.answered && q.answer && (
                  <div className="mt-6 bg-green-50 p-6 rounded-lg">
                    <p className="font-semibold text-green-800">Your Answer:</p>
                    <p className="text-gray-700 mt-2">{q.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}