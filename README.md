🌱 EcoTrack
EcoTrack is a community-driven sustainability platform where eco-conscious individuals can discover and join green challenges, share practical tips, track their environmental impact, and explore local eco-events. Built with the MERN stack and Firebase Auth, EcoTrack promotes measurable, collective progress toward a greener future.

🛠️ Tech Stack
Built with modern tools from the React and Node.js ecosystem:

React + React Router – SPA with protected and public routes

Tailwind CSS + DaisyUI – utility-first styling with accessible components

Firebase Auth – email/password + Google login

Axios – secure API communication with interceptors

Express.js + MongoDB – RESTful backend with Mongoose models

React Toastify – toast notifications for UX feedback

Vercel + Netlify – deployment for server and client respectively

📱 Features
🔐 Authentication System Firebase Auth with email/password and Google login. Auth state is globally managed and protected routes are enforced.

🧭 Dynamic Routing & Layouts Public and dashboard layouts with intuitive navigation and mobile responsiveness.

🧩 Challenge System Users can browse, join, and track progress on sustainability challenges like "Plastic-Free July" or "Energy Saver Week".

🧠 Tips & Events Community-submitted eco-tips and upcoming green events are dynamically fetched from the database.

📊 Live Stats & Progress Tracking Real-time community impact metrics and personal challenge dashboards.

🧼 Clean UX Skeleton loaders, global spinners, toast messages, and a custom 404 page ensure a smooth experience.

🔐 Pages Included
Home (dynamic sections: hero, stats, challenges, tips, events)

Challenges (browse, detail, join)

My Activities (dashboard with progress tracking)

Add Challenge (admin/user submission)

Login / Register (with validation and loading states)

Forgot Password (link only)

404 Error Page

🧱 Backend API
Built with Express.js and MongoDB, the API supports:

CRUD for Challenges, Tips, Events

Join & track progress via UserChallenges

Advanced filtering (category, date, participants)

Firebase Admin SDK (optional) for secure route protection

🧩 Collections & Sample Schema
js
// Challenge
{
  title, category, description, duration, target,
  participants, impactMetric, createdBy,
  startDate, endDate, imageUrl
}

// UserChallenge
{
  userId, challengeId, status, progress, joinDate
}

// Tip
{
  title, content, category, author, authorName,
  upvotes, createdAt
}

// Event
{
  title, description, date, location,
  organizer, maxParticipants, currentParticipants
}
🧪 UI/UX Highlights
Consistent typography, spacing, and button styles

Responsive grid layouts and equal-height cards

Semantic HTML with accessibility in mind

Custom toast messages (no default alerts)

Mobile-first design with hamburger menu

🚀 Deployment
Client: Netlify / Surge

Server: Vercel

Live Site: [Add your URL here]

Client Repo: [GitHub link]

Server Repo: [GitHub link]

📂 Project Structure
Code
eco-track-client/
├── components/       # Navbar, Footer, Cards
├── layouts/          # PublicLayout, DashboardLayout
├── pages/            # Home, Challenges, MyActivities, Auth
├── routes/           # AppRoutes, ProtectedRoute
├── context/          # AuthContext (Firebase)
├── services/         # Axios instance
├── utils/            # Toasts, validators
└── App.jsx, main.jsx

eco-track-server/
├── controllers/      # Logic for each resource
├── models/           # Mongoose schemas
├── routes/           # API endpoints
├── middlewares/      # Auth, error handling
├── utils/            # DB connection, Firebase Admin
└── app.js, server.js
🧠 Optional Enhancements
🏆 Leaderboard for top contributors

🏅 Badges for milestones

📣 Social Sharing for tips and challenges

🔐 Firebase Admin SDK for secure server-side auth

🧭 Getting Started
bash
# Client
cd eco-track-client
npm install
npm run dev

# Server
cd eco-track-server
npm install
npm run 