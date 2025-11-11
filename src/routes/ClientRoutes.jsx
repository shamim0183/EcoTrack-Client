import { createBrowserRouter } from "react-router"
import DashboardLayout from "../layouts/DashboardLayout"
import PublicLayout from "../layouts/PublicLayout"
import PrivateRoute from "./PrivateRoute"

import AddChallenge from "../Challenges/AddChallenge"
import ChallengeDetail from "../Challenges/ChallengeDetail"
import Home from "../pages/Home/Home"

import ActivityDetail from "../pages/MyActivities/ActivityDetail"
import MyActivities from "../pages/MyActivities/MyActivities"

import ForgotPassword from "../pages/Auth/ForgotPassword"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"

import AddEvents from "../events/AddEvents"
import Events from "../events/Events"
import About from "../pages/About"
import Contact from "../pages/Contact"
import NotFound from "../pages/Error/NotFound"
import Profile from "../pages/Profile/Profile"
import AddTips from "../tips/AddTips"
import Tips from "../tips/Tips"
import Dashboard from "../pages/Dashboard";
import ChallengesList from "../Challenges/ChallengesList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "challenges", element: <ChallengesList /> },
      { path: "challenges/:id", element: <ChallengeDetail /> },
      { path: "tips", element: <Tips /> },
      { path: "events", element: <Events /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "challenge/add", element: <AddChallenge /> },
      { path: "challenges/join/:id", element: <ChallengeDetail /> },
      { path: "tip/add", element: <AddTips /> },
      { path: "event/add", element: <AddEvents /> },
      {
        path: "my-activities",
        element: (
          <PrivateRoute>
            <MyActivities />
          </PrivateRoute>
        ),
      },
      { path: "my-activities/:id", element: <ActivityDetail /> },
      { path: "profile", element: <Profile /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
  { path: "*", element: <NotFound /> },
])
