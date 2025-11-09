import React, { useState, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router"
import { Bounce, toast } from "react-toastify"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { register, loading, error, handleSubmit, googleLogin } =
    useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [showPassword, setShowPassword] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")

  const passwordChecks = {
    length: passwordInput.length >= 6,
    uppercase: /[A-Z]/.test(passwordInput),
    lowercase: /[a-z]/.test(passwordInput),
    number: /\d/.test(passwordInput),
    special: /[@$!%*?&]/.test(passwordInput),
  }

  const onRegister = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const photoURL = form.photoURL.value

    await register(email, password, name, photoURL)
    navigate(location.state ? location.state : "/")
  }

  const handleGoogleRegister = async () => {
    try {
      await googleLogin()
      toast.success("Registered with Google!", {
        position: "top-right",
        autoClose: 1500,
        transition: Bounce,
      })
      navigate(location.state ? location.state : "/")
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-base-100">
      <div className="card w-full max-w-sm bg-base-200 shadow-xl py-8 px-6">
        <h1 className="text-3xl font-bold text-center gradient-text mb-6">
          Register for EcoTrack 🌿
        </h1>
        <form
          onSubmit={(e) =>
            handleSubmit(e, onRegister, "🎉 Account created successfully!")
          }
        >
          <fieldset className="space-y-4">
            <label className="label font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Your full name"
              required
            />

            <label className="label font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />

            <label className="label font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="input input-bordered w-full pr-10"
                placeholder="Create a password"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-accent z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Password Criteria Feedback */}
            <ul className="text-xs mt-2 space-y-1">
              <li
                className={
                  passwordChecks.length ? "text-success" : "text-error"
                }
              >
                • At least 6 characters
              </li>
              <li
                className={
                  passwordChecks.uppercase ? "text-success" : "text-error"
                }
              >
                • At least one uppercase letter
              </li>
              <li
                className={
                  passwordChecks.lowercase ? "text-success" : "text-error"
                }
              >
                • At least one lowercase letter
              </li>
              <li
                className={
                  passwordChecks.number ? "text-success" : "text-error"
                }
              >
                • At least one number
              </li>
              <li
                className={
                  passwordChecks.special ? "text-success" : "text-error"
                }
              >
                • At least one special character (@$!%*?&)
              </li>
            </ul>

            <label className="label font-semibold">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              className="input input-bordered w-full"
              placeholder="Paste your profile photo URL"
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <button
              type="button"
              onClick={handleGoogleRegister}
              className="btn btn-outline btn-accent hover:text-white w-full mt-2"
              disabled={loading}
            >
              <FcGoogle size={24} />
              Register with Google
            </button>

            {error && <p className="text-error text-sm mt-2">{error}</p>}

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="link link-hover text-primary font-medium"
              >
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Register
