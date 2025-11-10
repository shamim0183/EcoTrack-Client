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
import { Bounce, toast } from "react-toastify"
import { auth } from "../services/firebaseConfig"
import axios from "../api/axios";

import { useEffect, useState } from "react";

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
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

    // Sync with backend
    await axios.post("/users/sync", {
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      provider: result.user.providerData?.[0]?.providerId,
    })
  }

  const register = async (email, password, name, photoURL) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL,
    })
    await result.user.reload()
    setUser(auth.currentUser)

    // Sync with backend
    await axios.post("/users/sync", {
      email,
      name,
      photoURL,
      provider: "password",
    })
  }

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    setUser(result.user)
  }

  const githubLogin = async () => {
    const result = await signInWithPopup(auth, githubProvider)
    setUser(result.user)
  }

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
    toast.success("Password reset email sent!", {
      position: "top-right",
      autoClose: 3000,
      transition: Bounce,
    })
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
