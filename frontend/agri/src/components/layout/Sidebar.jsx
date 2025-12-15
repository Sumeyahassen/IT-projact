import { NavLink } from 'react-router-dom';

const menuItems = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: '🏠' },
    { to: '/admin/users', label: 'Manage Users', icon: '👥' },
    { to: '/admin/notifications', label: 'View Notifications', icon: '🔔' },
    { to: '/admin/prices', label: 'View Prices', icon: '💰' },
  ],
  farmer: [
    { to: '/farmer', label: 'Dashboard', icon: '🏠' },
    { to: '/farmer/prices', label: 'Market Prices', icon: '💰' },
    { to: '/farmer/notifications', label: 'Notifications', icon: '🔔' },
  ],
 agent: [
  { to: '/agent', label: 'Dashboard', icon: '🏠' },
  { to: '/agent/update-price', label: 'Update Price', icon: '📈' },
  { to: '/agent/prices', label: 'View Prices', icon: '💰' },
],
 extension: [
  { to: '/extension', label: 'Dashboard', icon: '🏠' },
  { to: '/extension/send-notification', label: 'Send Notification', icon: '📢' },
  { to: '/extension/sent-notifications', label: 'View Sent', icon: '📋' },
],
};

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const items = menuItems[user.role] || [];

  if (items.length === 0) {
    return null; // No sidebar if role not recognized
  }

  return (
    <aside className="w-64 bg-green-800 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-green-700">
        <h2 className="text-2xl font-bold text-center">🌾 Agri Platform</h2>
        <p className="text-center text-sm mt-2 opacity-90">
          {user.full_name || 'User'}
        </p>
        <p className="text-center text-xs mt-1 bg-green-700 inline-block px-3 py-1 rounded-full">
          {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest'}
        </p>
      </div>

      <nav className="mt-8 px-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-lg mb-2 transition-all ${
                isActive
                  ? 'bg-green-600 shadow-md font-semibold'
                  : 'hover:bg-green-700 hover:translate-x-1'
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-green-700 text-center text-sm opacity-80">
        <p>Ethiopian Agri Platform</p>
        <p className="text-xs mt-1">© 2025</p>
      </div>
    </aside>
  );
}