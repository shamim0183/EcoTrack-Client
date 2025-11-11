import { use } from "react";
import axios from "../api/axios"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext";

export default function JoinChallenge({ challengeId }) {
  const { user } = use(AuthContext)

  const handleJoin = async () => {
    if (!user?.email) {
      toast.error("You must be logged in to join.")
      return
    }

    try {
      await axios.post("/user-challenges/join", {
        userId: user.email,
        challengeId,
      })
      toast.success("Challenge joined!")
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info("You already joined this challenge.")
      } else {
        toast.error("Failed to join challenge")
        console.error(err)
      }
    }
  }

  return (
    <button onClick={handleJoin} className="btn btn-success">
      Join Challenge
    </button>
  )
}
