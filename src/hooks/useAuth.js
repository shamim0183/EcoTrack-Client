import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth"
import { useEffect, useState } from "react"
import { Bounce, toast } from "react-toastify"
import axios from "../api/axios"
import { auth } from "../services/firebaseConfig"

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userRole, setUserRole] = useState(null)

  const getToken = async () => {
    if (!auth.currentUser) return null
    return await auth.currentUser.getIdToken()
  }

  // Fetch user role from backend
  const fetchUserRole = async (email) => {
    try {
      const response = await axios.get(`/users/profile/${email}`)
      setUserRole(response.data.role || "user")
    } catch (err) {
      console.error("Failed to fetch user role:", err)
      setUserRole("user") // Default to user if fetch fails
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      setLoading(false)

      // Fetch role from backend if user is logged in
      if (currentUser?.email) {
        await fetchUserRole(currentUser.email)
      } else {
        setUserRole(null)
      }
    })

    const attachToken = async (config) => {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }

    const interceptor = axios.interceptors.request.use(attachToken, (error) =>
      Promise.reject(error)
    )

    return () => {
      unsubscribe()
      axios.interceptors.request.eject(interceptor)
    }
  }, [])

  const handleSubmit = async (e, callback, successMessage) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await callback(e)
      if (result?.error) throw new Error(result.error)

      toast.success(successMessage, {
        position: "top-right",
        autoClose: 1500,
        transition: Bounce,
      })
    } catch (err) {
      setError(err.message)
      toast.error("Username or password is incorrect!")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    setUser(result.user)

    await axios.post("/users/sync", {
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      provider: result.user.providerData?.[0]?.providerId,
    })

    // Fetch role after login
    await fetchUserRole(result.user.email)
  }

  const register = async (email, password, name, photoURL) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL,
    })
    await result.user.reload()
    setUser(auth.currentUser)

    await axios.post("/users/sync", {
      email,
      name,
      photoURL,
      provider: "password",
    })

    // Fetch role after registration
    await fetchUserRole(email)
  }

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    setUser(result.user)

    await axios.post("/users/sync", {
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      provider: result.user.providerData?.[0]?.providerId,
    })

    // Fetch role after Google login
    await fetchUserRole(result.user.email)
  }

  const githubLogin = async () => {
    const result = await signInWithPopup(auth, githubProvider)
    setUser(result.user)

    await axios.post("/users/sync", {
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      provider: result.user.providerData?.[0]?.providerId,
    })

    // Fetch role after GitHub login
    await fetchUserRole(result.user.email)
  }

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
    toast.success("Password reset email sent!", {
      position: "top-right",
      autoClose: 3000,
      transition: Bounce,
    })
  }

  const updateUserProfile = async (name, photoURL) => {
    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      })

      // Reload to get fresh data
      await auth.currentUser.reload()
      setUser(auth.currentUser)

      // Update backend database - URL encode the email to handle @ symbol
      await axios.patch(
        `/users/profile/${encodeURIComponent(auth.currentUser.email)}`,
        {
          name,
          photoURL,
        }
      )

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      })

      return { success: true }
    } catch (err) {
      console.error("Profile update error:", err)
      toast.error("Failed to update profile. Please try again.")
      return { success: false, error: err.message }
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    toast.success("Logged out!", {
      position: "top-right",
      autoClose: 1500,
      transition: Bounce,
    })
  }

  return {
    user,
    setUser,
    userRole,
    refreshUserRole: () => fetchUserRole(user?.email), // Allow manual role refresh
    updateUserProfile, // Add profile update function
    login,
    register,
    googleLogin,
    githubLogin,
    resetPassword,
    logout,
    handleSubmit,
    loading,
    error,
    provider: user?.providerData?.[0]?.providerId || null,
  }
}

export default useAuth
