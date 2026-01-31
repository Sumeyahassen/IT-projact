import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: send code, 2: verify + reset
  const navigate = useNavigate();

  const sendCode = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { phone });
      alert('Reset code sent to your phone!');
      setStep(2);
    } catch { alert('Failed to send code'); }
  };

  const resetPassword = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        phone, code, newPassword
      });
      alert('Password reset successful! Please login.');
      navigate('/login');
    } catch { alert('Invalid code or error'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-6 font-serif">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12">
        <h2 className="text-5xl font-bold text-center mb-12 text-green-800">
          Forgot Password
        </h2>

        {step === 1 ? (
          <div>
            <input
              type="text"
              placeholder="Phone (09xxxxxxxx)"
              className="w-full p-5 border-2 rounded-2xl text-xl mb-8"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <button
              onClick={sendCode}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl text-3xl"
            >
              Send Reset Code
            </button>
          </div>
        ) : (
          <div>
            <p className="text-center text-xl mb-8">Enter the 6-digit code sent to {phone}</p>
            <input
              type="text"
              placeholder="Reset Code"
              className="w-full p-5 border-2 rounded-2xl text-xl mb-4"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-5 border-2 rounded-2xl text-xl mb-8"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <button
              onClick={resetPassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl text-3xl"
            >
              Reset Password
            </button>
          </div>
        )}

        <p className="text-center mt-10 text-xl">
          <a href="/login" className="text-green-600 font-bold hover:underline">Back to Login</a>
        </p>
      </div>
    </div>
  );
}