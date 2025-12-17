import { motion } from "framer-motion"
import { useContext, useRef, useState } from "react"
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Link, useLocation, useNavigate } from "react-router"
import { Bounce, toast } from "react-toastify"
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
  const { login, loading, error, handleSubmit, googleLogin } =
    useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [isValidPassword, setIsValidPassword] = useState(null)
  const emailRef = useRef()

  const from = location.state?.from?.pathname || location.state?.from || "/"

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const onSignIn = async (e) => {
    const form = e.target
    const email = form.email.value

    await login(email, password)
    navigate(from, { replace: true })
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin()
      toast.success("Signed in with Google!", {
        position: "top-right",
        autoClose: 1500,
        transition: Bounce,
      })
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleForgotPassword = () => {
    const email = emailRef.current?.value || ""
    navigate("/forgot-password", { state: { email } })
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    setIsValidPassword(passwordRegex.test(value))
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-eco-primary/90 to-eco-primary-dark/90" />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaLeaf className="text-5xl" />
              <h1 className="text-5xl font-bold">EcoTrack</h1>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Track Your Impact,
              <br />
              Change The World
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Join thousands of eco-warriors making real change. Track your
              progress, join challenges, and create a sustainable future
              together.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>
                <p className="text-lg">Join global eco-challenges</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>
                <p className="text-lg">Track your environmental impact</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>
                <p className="text-lg">Connect with like-minded individuals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
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
              Welcome Back!
            </h2>
            <p className="text-gray-600 mb-8">
              Login to continue your eco-journey
            </p>

            <form
              onSubmit={(e) =>
                handleSubmit(e, onSignIn, "🦄 Login Successfully!")
              }
              className="space-y-6"
            >
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  ref={emailRef}
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
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary text-gray-900 placeholder-gray-400 pr-12 ${
                      isValidPassword === null
                        ? "border-gray-300"
                        : isValidPassword
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                    placeholder="Enter your password"
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
                {isValidPassword === false && (
                  <p className="text-red-500 text-sm mt-1">
                    Password must be at least 6 chars with uppercase, lowercase,
                    number, and special character
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-eco-primary hover:text-eco-primary-dark font-semibold"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className={`w-full bg-eco-primary hover:bg-eco-primary-dark text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
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

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
                disabled={loading}
              >
                <FcGoogle size={24} />
                Login with Google
              </button>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Register Link */}
              <p className="text-center text-gray-600 mt-6">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-eco-primary hover:text-eco-primary-dark font-bold"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
