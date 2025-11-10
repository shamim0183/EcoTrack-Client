import { createBrowserRouter } from "react-router"
import PublicLayout from "../layouts/PublicLayout"
import DashboardLayout from "../layouts/DashboardLayout"
import PrivateRoute from "./PrivateRoute"

import Home from "../pages/Home/Home"
import ChallengesList from "../pages/Challenges/ChallengesList"
import ChallengeDetail from "../pages/Challenges/ChallengeDetail"
import AddChallenge from "../pages/Challenges/AddChallenge"



import MyActivities from "../pages/MyActivities/MyActivities"
import ActivityDetail from "../pages/MyActivities/ActivityDetail"

import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import ForgotPassword from "../pages/Auth/ForgotPassword"

import Profile from "../pages/Profile/Profile"
import About from "../pages/About"
import Contact from "../pages/Contact"
import NotFound from "../pages/Error/NotFound"
import Tips from "../tips/Tips";
import Events from "../events/Events";
import AddTips from "../tips/AddTips";
import AddEvents from "../events/AddEvents";

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
      { path: "my-activities", element: <MyActivities /> },
      { path: "my-activities/:id", element: <ActivityDetail /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "*", element: <NotFound /> },
])
