import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import logo from "../assets/logo.png"
import { AuthContext } from "../context/AuthContext"
import MyLink from "./MyLink"

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

  const protectedLinks = [{ label: "Add Challenge", to: "/challenge/add" }]

  const dropdownLinks = [{ label: "My Activities", to: "/my-activities" }]

  return (
    <header className="sticky top-0 z-50 glass-strong backdrop-blur-lg shadow-eco">
      <div className="navbar px-4 flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Left: Logo + Mobile Dropdown */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden hover:bg-gray-100 rounded-lg p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
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
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow-lg bg-white rounded-box w-52 border border-gray-200"
            >
              {publicLinks.map(({ label, to }) => (
                <li key={label}>
                  <MyLink
                    to={to}
                    className="text-gray-900 hover:bg-eco-primary/10 hover:text-eco-primary font-medium"
                  >
                    {label}
                  </MyLink>
                </li>
              ))}
              {!user ? (
                <>
                  <li>
                    <MyLink
                      to="/login"
                      className="text-gray-900 hover:bg-eco-success hover:text-white font-medium"
                    >
                      Login
                    </MyLink>
                  </li>
                  <li>
                    <MyLink
                      to="/register"
                      className="text-gray-900 hover:bg-eco-success hover:text-white font-medium"
                    >
                      Register
                    </MyLink>
                  </li>
                </>
              ) : (
                <>
                  {dropdownLinks.map(({ label, to }) => (
                    <li key={label}>
                      <MyLink
                        to={to}
                        className="text-gray-900 hover:bg-eco-success hover:text-white font-medium"
                      >
                        {label}
                      </MyLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-gray-900 hover:bg-eco-primary/10 hover:text-eco-primary font-medium w-full text-left rounded-lg transition-all px-4 py-2"
                    >
                      Logout
                    </button>
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
        <div className="navbar-end gap-3">
          {/* Professional Theme Toggle */}
          {/* <label className="swap swap-rotate bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 cursor-pointer transition-all">
            <input
              type="checkbox"
              value="ecodark"
              className="theme-controller"
            />
            
            <svg
              className="swap-off fill-current w-6 h-6 text-amber-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0, 12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            
            <svg
              className="swap-on fill-current w-6 h-6 text-blue-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>  */}

          {/* Auth Buttons or Avatar Dropdown */}
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : user ? (
            <div className="relative hidden lg:block">
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
                  className="cursor-pointer w-10 h-10 rounded-full border-2 border-eco-primary object-cover hover:border-eco-success transition-all"
                />
              </button>

              {showDropdown && (
                <ul className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-box z-[100] p-2 space-y-2 border border-gray-200">
                  {dropdownLinks.map(({ label, to }) => (
                    <li key={label}>
                      <MyLink
                        to={to}
                        className="block px-4 py-2 text-gray-900 hover:bg-eco-primary/10 hover:text-eco-primary rounded-lg transition-all font-medium"
                      >
                        {label}
                      </MyLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-eco-primary/10 hover:text-eco-primary rounded-lg transition-all font-medium"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <MyLink
                to="/login"
                className="px-5 py-2.5 border-2 border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white font-semibold rounded-lg transition-all"
                style={{ color: undefined }}
              >
                Login
              </MyLink>
              <MyLink
                to="/register"
                className="px-5 py-2.5 bg-eco-success hover:bg-eco-primary-dark text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg"
                style={{ color: "#ffffff" }}
              >
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
