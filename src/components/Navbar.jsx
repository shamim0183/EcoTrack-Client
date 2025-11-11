import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { AuthContext } from "../context/AuthContext"
import MyLink from "./MyLink"
import logo from "../assets/logo.png"

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login", { replace: true })
  }

  const publicLinks = [
    { label: "Home", to: "/" },
    { label: "Challenges", to: "/challenges" },
    { label: "Tips", to: "/tips" },
    { label: "Events", to: "/events" },
  ]

  const protectedLinks = [
    { label: "Add Challenge", to: "/challenge/add" },
    { label: "Add Tip", to: "/tip/add" },
    { label: "Add Event", to: "/event/add" },
    { label: "Dashboard", to: "/dashboard" },
  ]

  const dropdownLinks = [
    { label: "Profile", to: "/profile" },
    { label: "My Activities", to: "/my-activities" },
  ]

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
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {publicLinks.map(({ label, to }) => (
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
                  {protectedLinks.map(({ label, to }) => (
                    <li key={label}>
                      <MyLink to={to}>{label}</MyLink>
                    </li>
                  ))}
                  {dropdownLinks.map(({ label, to }) => (
                    <li key={label}>
                      <MyLink to={to}>{label}</MyLink>
                    </li>
                  ))}
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center font-bold text-xl text-primary"
          >
            <img src={logo} alt="EcoTrack Logo" className="w-10 h-10" />
            <span className="font-Playfair text-3xl">EcoTrack</span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-4 items-center">
            {publicLinks.map(({ label, to }) => (
              <li key={label}>
                <MyLink to={to}>{label}</MyLink>
              </li>
            ))}
            {user &&
              protectedLinks.map(({ label, to }) => (
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
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
            />
          </label>

          {/* Auth Buttons or Avatar Dropdown */}
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2"
              >
                <img
                  src={
                    user.photoURL ||
                    user.providerData[0]?.photoURL ||
                    "/default-avatar.png"
                  }
                  alt="avatar"
                  className="cursor-pointer w-10 h-10 rounded-full border-2 border-primary object-cover"
                />
              </button>

              {showDropdown && (
                <ul className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-box z-50 p-2 space-y-2">
                  {dropdownLinks.map(({ label, to }) => (
                    <li key={label}>
                      <MyLink
                        to={to}
                        className="block px-4 py-2 hover:bg-primary rounded"
                      >
                        {label}
                      </MyLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full font-semibold text-primary text-left px-4 py-2 hover:bg-primary cursor-pointer hover:text-white rounded"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
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
