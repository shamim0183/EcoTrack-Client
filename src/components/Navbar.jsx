import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { AuthContext } from "../context/AuthContext"
import MyLink from "./MyLink"
import logo from "../assets/logo.png"

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Challenges", to: "/challenges" },
  { label: "My Activities", to: "/my-activities" },
]

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext)
  
  const [showName, setShowName] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login", { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar px-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo + Mobile Dropdown */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks.map(({ label, to }) => (
                <li key={label}>
                  <MyLink to={to}>{label}</MyLink>
                </li>
              ))}
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
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center font-bold text-xl text-primary animate__animated animate__fadeInDown"
          >
            <img src={logo} alt="EcoTrack Logo" className="w-10 h-10" />
            <span className="font-Playfair text-3xl">EcoTrack</span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-4 items-center">
            {navLinks.map(({ label, to }) => (
              <li key={label}>
                <MyLink to={to}>{label}</MyLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Theme + Auth */}
        <div className="navbar-end gap-4">
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
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : user ? (
            <>
              <div
                className="relative"
                onMouseEnter={() => setShowName(true)}
                onMouseLeave={() => setShowName(false)}
              >
                <img
                  src={user.photoURL || user.providerData[0].photoURL || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer object-cover"
                />
                {showName && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-base-200 text-sm px-3 py-1 rounded shadow whitespace-nowrap">
                    {user.displayName}
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-primary animate__animated animate__bounceIn"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="hidden lg:flex gap-2">
              <MyLink to="/login" className="btn btn-sm btn-outline">
                Login
              </MyLink>
              <MyLink to="/register" className="btn btn-sm btn-outline">
                Register
              </MyLink>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
