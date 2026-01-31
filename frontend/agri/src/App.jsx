// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

import AdminDashboard from "./pages/Admin/Dashboard.jsx";
import UserManagement from "./pages/Admin/UserManagement.jsx";
import AdminNotifications from "./pages/Admin/Notifications.jsx";
import AdminPrices from "./pages/Admin/Prices.jsx";
import SendSMS from "./pages/Admin/SendSMS.jsx";
import FarmerDashboard from "./pages/Farmer/Dashboard.jsx";
import FarmerPrices from "./pages/Farmer/Prices.jsx";
import FarmerNotifications from "./pages/Farmer/Notifications.jsx";
import MyQuestions from "./pages/Farmer/MyQuestions.jsx";
import AddLocalPrice from "./pages/Farmer/AddLocalPrice.jsx";
import AskQuestion from "./pages/Farmer/AskQuestion.jsx";
import AgentDashboard from "./pages/Agent/Dashboard.jsx";
import PriceManagement from "./pages/Agent/PriceManagement.jsx";
import UpdatePrice from "./pages/Agent/UpdatePrice.jsx";
import ViewPrices from "./pages/Agent/ViewPrices.jsx";
import ExtensionDashboard from "./pages/Extension/Dashboard.jsx";
import SentNotifications from "./pages/Extension/SendNotification.jsx";
import FarmerQuestions from "./pages/Extension/FarmerQuestions.jsx";
import Home from "./pages/Landing/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/prices" element={<AdminPrices />} />
          <Route path="/admin/send-sms" element={<SendSMS />} /> {/* ← New */}
        </Route>

        {/* Farmer Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["farmer"]} />}>
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/prices" element={<FarmerPrices />} />
          <Route
            path="/farmer/notifications"
            element={<FarmerNotifications />}
          />
          <Route path="/farmer/add-local-price" element={<AddLocalPrice />} />
          <Route path="/farmer/ask-question" element={<AskQuestion />} />
          <Route path="/farmer/my-questions" element={<MyQuestions />} />
        </Route>

        {/* Agent Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["agent"]} />}>
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/agent/prices" element={<ViewPrices />} />
          <Route path="/agent/update-price" element={<UpdatePrice />} />
          <Route path="/agent/manage-prices" element={<PriceManagement />} />
        </Route>

        {/* Extension Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["extension"]} />}>
          <Route path="/extension" element={<ExtensionDashboard />} />
          <Route
            path="/extension/send-notification"
            element={<SentNotifications />}
          />
          <Route
            path="/extension/sent-notifications"
            element={<SentNotifications />}
          />
          <Route
            path="/extension/farmer-questions"
            element={<FarmerQuestions />}
          />
        </Route>

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
