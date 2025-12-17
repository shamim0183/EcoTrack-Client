# 🌱 EcoTrack

## About

**Community-driven sustainability platform with interactive challenges, eco-tips, and event tracking for eco-conscious individuals.**

🔗 **Live Site:** [ecotrackbd.netlify.app](https://ecotrackbd.netlify.app)

**Technologies:** `reactjs` `mongodb` `expressjs` `firebase-auth` `tailwindcss` `daisyui`

---

**EcoTrack** is a community-driven sustainability platform where eco-conscious individuals can discover and join green challenges, share practical tips, track their environmental impact, and explore local eco-events. Built with the MERN stack and Firebase Auth, EcoTrack promotes measurable, collective progress toward a greener future.

## 🛠️ Tech Stack

Built with modern tools from the React and Node.js ecosystem:

- **React + React Router** – SPA with protected and public routes
- **Tailwind CSS + DaisyUI** – utility-first styling with accessible components
- **Firebase Auth** – email/password + Google login
- **Axios** – secure API communication with interceptors
- **Express.js + MongoDB Atlas** – RESTful backend with modular routes
- **React Toastify** – toast notifications for UX feedback
- **Netlify + Vercel** – client hosted on Netlify, server deployed as a serverless function on Vercel

## 📱 Features

- 🔐 **Authentication System**  
  Firebase Auth with email/password and Google login. Auth state is globally managed and protected routes are enforced.

- 🧭 **Dynamic Routing & Layouts**  
  Public and dashboard layouts with intuitive navigation and mobile responsiveness.

- 🧩 **Challenge System**  
  Users can browse, join, and track progress on sustainability challenges like "Plastic-Free July" or "Energy Saver Week".

- 🧠 **Tips & Events**  
  Community-submitted eco-tips and upcoming green events are dynamically fetched from the database.

- 📊 **Live Stats & Progress Tracking**  
  Real-time community impact metrics and personal challenge dashboards.

- 🧼 **Clean UX**  
  Skeleton loaders, global spinners, toast messages, and a custom 404 page ensure a smooth experience.

## 🔐 Pages Included

- Home _(dynamic sections: hero, stats, challenges, tips, events)_
- Challenges _(browse, detail, join)_
- My Activities _(dashboard with progress tracking)_
- Add Challenge _(admin/user submission)_
- Login / Register _(with validation and loading states)_
- Forgot Password _(link only)_
- 404 Error Page

## 🧱 Backend API

Built with Express.js and MongoDB, the API supports:

- CRUD for **Challenges**, **Tips**, **Events**
- Join & track progress via **UserChallenges**
- Advanced filtering (category, date, participants)
- Firebase Admin SDK (optional) for secure route protection

> ⚠️ **Note:** The backend is deployed on Vercel as a serverless function. All API routes are prefixed with `/api`.  
> Example: `https://eco-track-server-eight.vercel.app/api/events`

> 🔗 **Server Repository:** [EcoTrack-Server](https://github.com/shamim0183/EcoTrack-Server)

## 📂 Project Structure

```
client/
├── public/                    # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── CategoryBrowseGrid.jsx
│   │   ├── ChallengeCard.jsx
│   │   ├── Container.jsx
│   │   ├── EventCard.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── HowItWorksSection.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── MyLink.jsx
│   │   ├── Navbar.jsx
│   │   ├── SearchHeroSection.jsx
│   │   ├── SkeletonCard.jsx
│   │   ├── StatCard.jsx
│   │   ├── StatsSection.jsx
│   │   ├── TestimonialsCarousel.jsx
│   │   ├── TipCard.jsx
│   │   ├── TopEcoWarriorsSection.jsx
│   │   └── WhyGoGreenSection.jsx
│   ├── Challenges/            # Challenge pages
│   │   ├── AddChallenge.jsx
│   │   ├── ChallengeDetail.jsx
│   │   ├── ChallengesList.jsx
│   │   ├── EditChallenge.jsx
│   │   ├── JoinChallenge.jsx
│   │   └── JoinedChallengeCard.jsx
│   ├── pages/                 # Application pages
│   │   ├── Auth/              # Authentication pages
│   │   ├── Home/              # Home page
│   │   ├── MyActivities/      # User activities
│   │   ├── Error/             # Error pages
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   ├── events/                # Event pages
│   │   ├── AddEvents.jsx
│   │   └── Events.jsx
│   ├── tips/                  # Tips pages
│   │   ├── AddTips.jsx
│   │   └── Tips.jsx
│   ├── layouts/               # Layout components
│   │   ├── DashboardLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useDashboardData.js
│   ├── context/               # Context providers
│   │   └── AuthContext.jsx    # Firebase authentication
│   ├── routes/                # Route configuration
│   ├── services/              # API services
│   ├── api/                   # API utilities
│   ├── assets/                # Static assets (images, etc.)
│   ├── index.css              # Global styles & theme
│   └── main.jsx               # App entry point
├── .env.local                 # Environment variables
├── eslint.config.js           # ESLint configuration
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies
```

## 🧪 UI/UX Highlights

- Consistent typography, spacing, and button styles
- Responsive grid layouts and equal-height cards
- Semantic HTML with accessibility in mind
- Custom toast messages (no default alerts)
- Mobile-first design with hamburger menu

## 🚀 Deployment

- 🔗 **Live Site**: https://ecotrackbd.netlify.app
- 🔗 **Server (Vercel)**: https://eco-track-server-eight.vercel.app
  - Example API usage: `https://eco-track-server-eight.vercel.app/api/events`
- 📁 **Client Repo**: https://github.com/shamim0183/EcoTrack-Client
- 📁 **Server Repo**: https://github.com/shamim0183/EcoTrack-Server

## 🧠 Optional Enhancements

- 🏆 Leaderboard for top contributors
- 🏅 Badges for milestones
- 📣 Social Sharing for tips and challenges
- 🔐 Firebase Admin SDK for secure server-side auth

## 🧭 Getting Started
