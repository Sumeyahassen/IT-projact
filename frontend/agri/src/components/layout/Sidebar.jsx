import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
  HiHome,
  HiUsers,
  HiBell,
  HiCurrencyDollar,
  HiPlusCircle,
  HiTrendingUp,
  HiSpeakerphone,
  HiClipboardList,
  HiMenu,
  HiX,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { FaReply } from 'react-icons/fa';

const menuItems = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: HiHome },
    { to: '/admin/users', label: 'Manage Users', icon: HiUsers },
    { to: '/admin/notifications', label: 'Notifications', icon: HiBell },
    { to: '/admin/prices', label: 'Market Prices', icon: HiCurrencyDollar },
    { to: '/admin/send-sms', label: 'Send Emergency SMS', icon: HiSpeakerphone },
  ],
  farmer: [
    { to: '/farmer', label: 'Dashboard', icon: HiHome },
    { to: '/farmer/prices', label: 'Market Prices', icon: HiCurrencyDollar },
    { to: '/farmer/notifications', label: 'Notifications', icon: HiBell },
    { to: '/farmer/add-local-price', label: 'Add Local Price', icon: HiPlusCircle },
    { to: '/farmer/ask-question', label: 'Ask Question', icon: HiQuestionMarkCircle },
    { to: '/farmer/my-questions', label: 'Answer', icon: FaReply },
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
    { to: '/extension/farmer-questions', label: 'Farmer Questions', icon: HiQuestionMarkCircle },
  ],
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const items = menuItems[user.role] || [];

  useEffect(() => {
    const toggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-sidebar', toggle);
    return () => window.removeEventListener('toggle-sidebar', toggle);
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-[60] lg:hidden bg-green-700 text-white p-3 rounded-lg shadow-lg"
      >
        {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-green-700 text-white z-[55] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64 w-64 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-green-700 font-serif ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-center lg:text-left pt-10  ">
                <img
                  src={logo}
                  alt="logo"
                  className="w-12 h-12 object-contain rounded-full mx-auto lg:mx-0 "
                />{' '}
                Agri Link
              </h2>
              <p className="text-center lg:text-left text-sm mt-2 opacity-90">
                {user.full_name || 'User'}
              </p>
              <p className="text-center lg:text-left text-xs mt-2 bg-green-700 px-3 py-1 rounded-full inline-block">
                {user.role?.toUpperCase() || 'GUEST'}
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
       <nav className="mt-6 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-green-900">

          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-5 py-4 rounded-lg mb-2 transition-all duration-200 ${
                    isActive
                      ? 'bg-green-600 shadow-md font-semibold'
                      : 'hover:bg-green-400 hover:translate-x-1'
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
          <p>Ethiopian Agri Link</p>
          <p className="text-xs mt-1">© 2025</p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
