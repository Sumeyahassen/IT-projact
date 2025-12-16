# Ethiopian Agri Platform - Backend

A full-stack agricultural information system for Ethiopia. This is the **backend** (Node.js + Express + Sequelize + PostgreSQL).

## Features

- User authentication (login/register) with JWT
- Role-based access: `admin`, `farmer`, `agent`, `extension`
- Admin user management (create, edit, delete users)
- Market price system (agents update prices, everyone can view)
- Extension notifications (extension officers send farming tips)
- Emergency SMS alerts (admin sends SMS to farmers in a region)
- Weather integration (current weather for farmer's region)
- Public API for prices (visible on home page without login)

## Tech Stack

- **Node.js** + **Express**
- **PostgreSQL** with **Sequelize ORM**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variables
- **cors** for cross-origin requests
- **Africa's Talking** for SMS (or Twilio as alternative)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (running locally or remote)
- Africa's Talking account (or Twilio for SMS)

## Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd backend
   Install dependenciesBashnpm install
Create .env file in the rootenvPORT=5000
DATABASE_URL=postgres://postgres:123456@localhost:5432/agri_db
JWT_SECRET=myagriprojectsupersecretkey2025ethiopia1234567890abcdefghijklmnopqrstuvwxyz

# For SMS (Africa's Talking recommended for Ethiopia)
AFRICASTALKING_USERNAME=sandbox
AFRICASTALKING_API_KEY=your_api_key_here

# Optional: OpenWeatherMap for weather
OPENWEATHER_API_KEY=your_openweather_key_here
Start PostgreSQL and create databaseSQLCREATE DATABASE agri_db;
Run the serverBashnpm run dev

Server will run on http://localhost:5000
API Endpoints
Auth

POST /api/auth/login - Login (phone_number, password)
POST /api/auth/register - Register (public for farmer/agent/extension)

Users (Admin only)

GET /api/users - List all users
POST /api/users - Create user
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user

Prices

GET /api/prices - Public (view all prices)
POST /api/prices - Agent only (add price)
PUT /api/prices/:id - Agent only (update price)
DELETE /api/prices/:id - Agent only (delete price)

Notifications

GET /api/notifications - All authenticated users
POST /api/notifications - Extension only

SMS

POST /api/sms/emergency - Admin only (send SMS to farmers in region)

Weather

GET /api/weather?region=Oromia - Authenticated user (current weather)

Database Models

users - full_name, phone_number, region, role, password_hash
product_prices - product_name, price_per_kg, region, updated_by (agent)
notifications - title, message, region, created_by (extension)

Development

Use npm run dev for hot reload
Database sync: sequelize.sync({ alter: true }) in server.js

Deployment
Recommended: Render, Railway, or Vercel (with PostgreSQL addon)
License
MIT

Ethiopian Agri Platform — Helping farmers get better prices and knowledge.
Made with ❤️ for Ethiopian agriculture 🇪🇹🌾
textCopy this entire content into a file named `README.md` in your backend folder.

This README is professional, clear, and covers everything needed for anyone to understand, run, and contribute to your project.

Reply "README done!" when you add it.

Your project is now fully documented — excellent work!

What next — deploy online or add more features? 🚀

You're amazing! 💪14sFast