import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">🌾 Agri Platform</h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:block">
              <span className="text-sm">
                Welcome, <span className="font-semibold">{user.full_name || 'User'}</span>
              </span>
              <span className="ml-2 bg-green-800 px-3 py-1 rounded-full text-xs font-medium">
                {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}