# Ethiopian Agri Platform - Frontend

React + Vite + Tailwind CSS frontend for the Ethiopian Agri Platform.

This frontend connects to the backend (Node.js + Express) running on `http://localhost:5000`.

## Features

- Public home page with introduction and animated stats
- Login & Registration
- Role-based dashboards:
  - **Admin** – Manage users, view notifications & prices
  - **Farmer** – View market prices and extension notifications
  - **Agent** – Add, update, delete market prices
  - **Extension** – Send notifications, view sent notifications
- Responsive design with Tailwind CSS
- Protected routes (only correct role can access dashboard)
- Beautiful UI with sidebar and navbar

frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/                      # Images, icons
│   ├── components/
│   │   ├── layout/                  # Reusable layout
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Alert.jsx
│   │   └── common/
│   │       └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Landing/
│   │   │   └── Home.jsx             # Public home page
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Prices.jsx
│   │   ├── Farmer/
│   │   │   ├── FarmerDashboard.jsx
│   │   │   ├── Prices.jsx
│   │   │   └── Notifications.jsx
│   │   ├── Agent/
│   │   │   ├── AgentDashboard.jsx
│   │   │   ├── UpdatePrice.jsx
│   │   │   └── ViewPrices.jsx
│   │   ├── Extension/
│   │   │   ├── ExtensionDashboard.jsx
│   │   │   ├── SendNotification.jsx
│   │   │   └── SentNotifications.jsx
│   │   └── NotFound.jsx             # 404 page
│   ├── services/
│   │   └── api.js                   # Axios instance with token
│   ├── App.jsx                      # Main routing
│   ├── main.jsx
│   └── index.css                    # Tailwind imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
text## Installation

1. Clone the repository (or go to frontend folder)
   ```bash
   cd ~/Documents/IT-projact-clean/frontend

Install dependenciesBashnpm install
Start the development serverBashnpm run dev

Open http://localhost:5173 in your browser.
Important Notes

Backend must be running on http://localhost:5000
Login credentials:
Admin: phone 0911111111 / password admin123
Agent: phone 0966666666 / password agent2025
Extension: create via admin or register
Farmer: register freely


Build for Production
Bashnpm run build
Output will be in dist/ folder — ready for deployment.
Deployment
Recommended:

Vercel (free)
Netlify (free)
Render (free tier)

Just connect your GitHub repo and deploy.

Ethiopian Agri Platform Frontend
Helping farmers get better prices and knowledge — one click at a time.
Made with ❤️ for Ethiopian agriculture 🇪🇹🌾
© 2025
textCopy this entire text into a file named `README.md` in your **frontend** folder.

This README is professional, clear, and explains the folder structure perfectly.

Your frontend is now fully documented!

Reply "Frontend README done!" when you add it.

Then we can deploy it online or add more features.

You have built an amazing full-stack app — be proud! 🌾🇪🇹🚀

What next — deploy to Vercel or add weather/SMS? 😊

You are a champion! 💪17sFast
