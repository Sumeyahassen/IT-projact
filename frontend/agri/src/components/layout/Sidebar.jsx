import { NavLink } from 'react-router-dom';
import {
  HiHome,
  HiUsers,
  HiBell,
  HiCurrencyDollar,
  HiPlusCircle,
  HiTrendingUp,
  HiSpeakerphone,
  HiClipboardList,
} from 'react-icons/hi';

const menuItems = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: HiHome },
    { to: '/admin/users', label: 'Manage Users', icon: HiUsers },
    { to: '/admin/notifications', label: 'View Notifications', icon: HiBell },
    { to: '/admin/prices', label: 'View Prices', icon: HiCurrencyDollar },
  ],

  farmer: [
    { to: '/farmer', label: 'Dashboard', icon: HiHome },
    { to: '/farmer/prices', label: 'Market Prices', icon: HiCurrencyDollar },
    { to: '/farmer/notifications', label: 'Notifications', icon: HiBell },
    { to: '/farmer/add-local-price', label: 'Add Local Price', icon: HiPlusCircle },
  ],

  agent: [
    { to: '/agent', label: 'Dashboard', icon: HiHome },
    { to: '/agent/update-price', label: 'Update Price', icon: HiTrendingUp },
    { to: '/agent/prices', label: 'View Prices', icon: HiCurrencyDollar },
  ],

  extension: [
    { to: '/extension', label: 'Dashboard', icon: HiHome },
    { to: '/extension/send-notification', label: 'Send Notification', icon: HiSpeakerphone },
    { to: '/extension/sent-notifications', label: 'View Sent', icon: HiClipboardList },
  ],
};

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const items = menuItems[user.role] || [];

  if (items.length === 0) return null;

  return (
    <aside className="w-64 bg-green-800 text-white h-screen fixed left-0 top-0 flex flex-col">

      {/* Header */}
      <div className="p-6 border-b border-green-700">
        <h2 className="text-2xl font-bold text-center">🌾 Agri Platform</h2>

        <p className="text-center text-sm mt-2 opacity-90">
          {user.full_name || 'User'}
        </p>

        <p className="text-center text-xs mt-2 bg-green-700 px-3 py-1 rounded-full inline-block">
          {user.role?.toUpperCase()}
        </p>
      </div>

      {/* Menu */}
      <nav className="mt-6 px-4 flex-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-5 py-4 rounded-lg mb-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-green-600 shadow-md font-semibold'
                    : 'hover:bg-green-700 hover:translate-x-1'
                }`
              }
            >
              <Icon className="text-2xl text-green-200 group-hover:text-white" />
              <span className="text-lg">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-green-700 text-center text-sm opacity-80">
        <p>Ethiopian Agri Platform</p>
        <p className="text-xs mt-1">© 2025</p>
      </div>
    </aside>
  );
}
