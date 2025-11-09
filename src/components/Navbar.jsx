import { Link } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import MyLink from "./MyLink"
import Container from "./Container"
import logo from "../assets/logo.png"

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  const navLinks = (
    <>
      <li>
        <MyLink to="/">Home</MyLink>
      </li>
      <li>
        <MyLink to="/challenges">Challenges</MyLink>
      </li>
      <li>
        <MyLink to="/my-activities">My Activities</MyLink>
      </li>
    </>
  )

  return (
    <div className=" navbar bg-base-100 shadow-md">
      {/* Logo */}
      <div className="max-w-7xl mx-auto navbar px-4 w-full">
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center text-xl font-bold text-primary"
          >
            <img src={logo} alt="EcoTrack Logo" className="w-12 h-12" />
            <span className="font-Playfair font-bold text-2xl">EcoTrack</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-4">
          {/* Theme Toggle */}
          <label className="flex cursor-pointer gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </label>

          {/* Auth Buttons or Avatar */}
          {!user ? (
            <div className="hidden lg:flex gap-2">
              <MyLink to="/login" className="btn btn-sm btn-outline">
                Login
              </MyLink>
              <MyLink to="/register" className="btn btn-sm btn-outline">
                Register
              </MyLink>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-sm btn-ghost avatar">
                <div className="w-8 rounded-full">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <MyLink to="/profile">Profile</MyLink>
                </li>
                <li>
                  <MyLink to="/my-activities">My Activities</MyLink>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {!user ? (
              <>
                <li>
                  <MyLink to="/login">Login</MyLink>
                </li>
                <li>
                  <MyLink to="/register">Register</MyLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <MyLink to="/profile">Profile</MyLink>
                </li>
                <li>
                  <MyLink to="/my-activities">My Activities</MyLink>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
