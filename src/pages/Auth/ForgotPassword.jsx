import { useContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import { Bounce, toast } from "react-toastify"
import { AuthContext } from "../../context/AuthContext";

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext)
  const location = useLocation()
  const emailRef = useRef()
  const [email, setEmail] = useState("")

  useEffect(() => {
    const passedEmail = location.state?.email || ""
    setEmail(passedEmail)
  }, [location.state])

  const handleReset = async (e) => {
    e.preventDefault()
    const userEmail = emailRef.current?.value || ""

    if (!userEmail) {
      toast.error("Please enter your email")
      return
    }

    try {
      await resetPassword(userEmail)
      toast.success("Password reset email sent!", {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      })
    } catch (err) {
      toast.error(err.message || "Failed to send reset email")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-base-100">
      <div className="card w-full max-w-sm bg-base-200 shadow-xl py-8 px-6">
        <h1 className="text-2xl font-bold text-center gradient-text mb-4">
          Forgot Password 🔐
        </h1>
        <form onSubmit={handleReset}>
          <fieldset className="space-y-4">
            <label className="label font-semibold">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              defaultValue={email}
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />

            <button type="submit" className="btn btn-primary w-full mt-2">
              Send Reset Link
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
