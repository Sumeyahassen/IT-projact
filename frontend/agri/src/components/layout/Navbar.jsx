import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-green-700 text-white shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Agri Link</h1>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {user.role ? (
              <>
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-sm">Welcome,</span>
                  <span className="font-semibold">{user.full_name}</span>
                  <span className="bg-green-800 px-3 py-1 rounded-full text-xs">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-green-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
