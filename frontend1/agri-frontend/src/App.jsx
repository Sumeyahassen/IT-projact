import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import FarmerDashboard from './pages/FarmerDashboard';
import AgentDashboard from './pages/AgentDashboard';
import ExtensionDashboard from './pages/ExtensionDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
        <Navbar />
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/farmer" element={<FarmerDashboard />} />
  <Route path="/agent" element={<AgentDashboard />} />
  <Route path="/extension" element={<ExtensionDashboard />} />
  <Route path="/admin" element={<AdminDashboard />} />
</Routes>
      </div>
    </Router>
  );
}

export default App;