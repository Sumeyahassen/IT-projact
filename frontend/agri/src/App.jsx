// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import AdminDashboard from './pages/Admin/Dashboard.jsx';
import FarmerDashboard from './pages/Farmer/Dashboard.jsx';
import AgentDashboard from './pages/Agent/Dashboard.jsx';
import ExtensionDashboard from './pages/Extension/Dashboard.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['farmer']} />}>
          <Route path="/farmer" element={<FarmerDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['agent']} />}>
          <Route path="/agent" element={<AgentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['extension']} />}>
          <Route path="/extension" element={<ExtensionDashboard />} />
        </Route>

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
