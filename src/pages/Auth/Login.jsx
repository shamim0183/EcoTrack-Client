import { useContext, useRef, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router"
import { Bounce, toast } from "react-toastify"
import { FcGoogle } from "react-icons/fc"
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
    <div className="flex justify-center items-center min-h-screen px-4 bg-base-100">
      <div className="card w-full max-w-sm bg-base-200 shadow-xl py-8 px-6">
        <h1 className="text-3xl font-bold text-center gradient-text mb-6">
          Login to EcoTrack 🌿
        </h1>

        <form
          onSubmit={(e) => handleSubmit(e, onSignIn, "🦄 Login Successfully!")}
        >
          <fieldset className="space-y-4">
            <label className="label font-semibold">Email</label>
            <input
              ref={emailRef}
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
                value={password}
                onChange={handlePasswordChange}
                className={`input input-bordered w-full pr-10 ${
                  isValidPassword === null
                    ? ""
                    : isValidPassword
                    ? "border-green-500 focus:border-green-500"
                    : "border-red-500 focus:border-red-500"
                }`}
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-accent z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {isValidPassword === false && (
              <p className="text-red-500 text-sm">
                Must be at least 6 chars, include uppercase, lowercase, number, and
                special character.
              </p>
            )}

            <div className="text-sm mt-2">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="link link-hover text-primary"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-accent hover:text-white w-full mt-2"
              disabled={loading}
            >
              <FcGoogle size={24} />
              Login In with Google
            </button>

            {error && <p className="text-error text-sm mt-2">{error}</p>}

            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="link link-hover text-primary font-medium"
              >
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Login
