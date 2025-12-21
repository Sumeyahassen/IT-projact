import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import UserManagement from './UserManagement';
import { FaUsers, FaChartBar, FaExclamationTriangle } from "react-icons/fa";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-4xl font-bold text-green-800 font-serif ">
          Admin Dashboard
        </h1>
        <p className="text-xl text-gray-700 mb-10 font-serif">
          Welcome back, <span className="font-semibold">{user.full_name}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

  <div className="bg-white p-8 rounded-xl shadow-lg text-center">
    <FaUsers className="text-5xl text-green-700 mx-auto mb-4" />
    <h3 className="text-2xl font-bold text-green-700">
      User Management
    </h3>
    <p className="text-gray-600 mt-2">
      Add, edit, delete farmers, agents, and extension officers
    </p>
  </div>

  <div className="bg-white p-8 rounded-xl shadow-lg text-center">
    <FaChartBar className="text-5xl text-green-700 mx-auto mb-4" />
    <h3 className="text-2xl font-bold text-green-700">
      Platform Stats
    </h3>
    <p className="text-gray-600 mt-2">
      View total users, notifications, prices
    </p>
  </div>

  <div className="bg-white p-8 rounded-xl shadow-lg text-center">
    <FaExclamationTriangle className="text-5xl text-green-700 mx-auto mb-4" />
    <h3 className="text-2xl font-bold text-green-700">
      Emergency Alerts
    </h3>
    <p className="text-gray-600 mt-2">
      Send SMS alerts to farmers (coming soon)
    </p>
  </div>

</div>


        {/* User Management Section */}
  <UserManagement />
      </div>

    </Layout>
  );
}