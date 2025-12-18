import { useEffect, useState } from 'react';
import api from "../../services/api.js";
import Layout from "../../components/layout/Layout.jsx";

export default function MyQuestions() {
  const [myQuestions, setMyQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyQuestions = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/questions');
        setMyQuestions(res.data);
      } catch (err) {
        setError('Failed to load your questions');
      } finally {
        setLoading(false);
      }
    };

    fetchMyQuestions();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-2xl text-gray-600">Loading your questions...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-12">
          My Questions & Answers
        </h1>

        {myQuestions.length === 0 ? (
          <div className="bg-gray-100 p-16 rounded-2xl text-center">
            <p className="text-2xl text-gray-600">You haven't asked any questions yet.</p>
            <p className="text-gray-500 mt-4">
              Go to Dashboard to ask your first question!
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {myQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300"
              >
                <div className="mb-8">
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    Your Question:
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">{q.question}</p>
                  <p className="text-sm text-gray-500 mt-4">
                    Asked on: {new Date(q.createdAt).toLocaleDateString('en-GB')}
                  </p>
                </div>

                {q.answered ? (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-xl border-l-4 border-green-600">
                    <p className="text-xl font-bold text-green-800 mb-4">
                      Answer from Extension Officer:
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">{q.answer}</p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                    <p className="text-lg font-medium text-yellow-800">
                      Waiting for answer...
                    </p>
                    <p className="text-gray-600 mt-2">
                      Extension officer will respond soon.
                    </p>
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