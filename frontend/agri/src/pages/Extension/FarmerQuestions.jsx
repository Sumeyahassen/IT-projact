import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Layout from '../../components/layout/Layout.jsx';

export default function FarmerQuestions() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get('/questions');
      setQuestions(res.data);
    } catch (err) {
      setMessage('Error loading questions');
    }
  };

  const handleAnswer = async () => {
    setLoading(true);
    setMessage('');

    try {
      await api.put(`/questions/${selectedQuestion.id}/answer`, { answer });
      setMessage('Answer sent successfully!');
      setAnswer('');
      setSelectedQuestion(null);
      fetchQuestions();
    } catch (err) {
      setMessage('Error sending answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Farmer Questions</h1>

        {message && (
          <div className={`p-6 rounded-lg mb-8 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {questions.length === 0 ? (
          <p className="text-xl text-gray-600">No questions from farmers yet.</p>
        ) : (
          <div className="space-y-8">
            {questions.map(q => (
              <div key={q.id} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-800 mb-4">{q.question}</p>
                    <p className="text-sm text-gray-600">
                      From: {q.farmer.full_name} ({q.farmer.phone_number}) - {q.farmer.region}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Asked on: {new Date(q.createdAt).toLocaleDateString()}
                    </p>
                    {q.answered && (
                      <p className="text-green-600 font-medium mt-4">✓ Answered</p>
                    )}
                  </div>
                  {!q.answered && (
                    <button
                      onClick={() => setSelectedQuestion(q)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg ml-6"
                    >
                      Answer
                    </button>
                  )}
                </div>

                {q.answer && (
                  <div className="mt-6 bg-green-50 p-6 rounded-lg">
                    <p className="font-semibold text-green-800">Your Answer:</p>
                    <p className="text-gray-700 mt-2">{q.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Answer Modal/Form */}
        {selectedQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4">
              <h2 className="text-2xl font-bold text-green-800 mb-6">Answer Question</h2>
              <p className="text-gray-700 mb-6"><strong>Question:</strong> {selectedQuestion.question}</p>
              <p className="text-sm text-gray-600 mb-6">
                From: {selectedQuestion.farmer.full_name} - {selectedQuestion.farmer.region}
              </p>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows="8"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 mb-6"
                placeholder="Write your answer here..."
              />

              <div className="flex gap-4">
                <button
                  onClick={handleAnswer}
                  disabled={loading || !answer.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-70"
                >
                  {loading ? 'Sending...' : 'Send Answer'}
                </button>
                <button
                  onClick={() => {
                    setSelectedQuestion(null);
                    setAnswer('');
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}