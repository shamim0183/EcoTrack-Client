import { motion } from "framer-motion"
import { useContext, useState } from "react"
import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaLeaf,
  FaTimesCircle,
} from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Link, useLocation, useNavigate } from "react-router"
import { Bounce, toast } from "react-toastify"
import { AuthContext } from "../../context/AuthContext"

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
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2 justify-center mb-6">
              <FaLeaf className="text-3xl text-eco-primary" />
              <h1 className="text-3xl font-bold text-gray-900">EcoTrack</h1>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 mb-8">
              Join us in making the world greener
            </p>

            <form
              onSubmit={(e) =>
                handleSubmit(e, onRegister, "🎉 Account created successfully!")
              }
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400 pr-12"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>

                {/* Password Criteria */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    {passwordChecks.length ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-gray-300" />
                    )}
                    <span
                      className={
                        passwordChecks.length
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {passwordChecks.uppercase ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-gray-300" />
                    )}
                    <span
                      className={
                        passwordChecks.uppercase
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {passwordChecks.lowercase ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-gray-300" />
                    )}
                    <span
                      className={
                        passwordChecks.lowercase
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {passwordChecks.number ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-gray-300" />
                    )}
                    <span
                      className={
                        passwordChecks.number
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One number
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {passwordChecks.special ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-gray-300" />
                    )}
                    <span
                      className={
                        passwordChecks.special
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One special character (@$!%*?&)
                    </span>
                  </div>
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  placeholder="Paste your profile photo URL"
                  required
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className={`w-full bg-eco-primary hover:bg-eco-primary-dark text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Register */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
                disabled={loading}
              >
                <FcGoogle size={24} />
                Register with Google
              </button>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Login Link */}
              <p className="text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  to="/Login"
                  className="text-eco-primary hover:text-eco-primary-dark font-bold"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-eco-primary/90 to-eco-primary-dark/90" />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaLeaf className="text-5xl" />
              <h1 className="text-5xl font-bold">Join EcoTrack</h1>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Start Your Journey
              <br />
              Towards Sustainability
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Become part of a global community committed to environmental
              change. Every small action counts towards a greener future.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  🌱
                </div>
                <div>
                  <p className="text-lg font-semibold">2,500+ Active Users</p>
                  <p className="text-sm text-gray-200">Making a difference</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <p className="text-lg font-semibold">120+ Challenges</p>
                  <p className="text-sm text-gray-200">To choose from</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  🌍
                </div>
                <div>
                  <p className="text-lg font-semibold">1.2M kg CO₂ Saved</p>
                  <p className="text-sm text-gray-200">By our community</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Register
