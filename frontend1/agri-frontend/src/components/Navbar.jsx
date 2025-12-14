import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-green-700 text-white p-6 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          Ethiopian Agri Platform
        </h1>
        {user ? (
          <div className="flex items-center gap-8">
            <span className="text-xl">Hi, <strong>{user.username}</strong> ({user.role})</span>
            <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl text-lg font-bold">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-xl text-lg font-bold">
            Login / Register
          </button>
        )}
      </div>
    </nav>
  );
}