import { useParams } from "react-router"
import { useContext, useEffect, useState } from "react"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner";

export default function ChallengeDetail() {
  const { id } = useParams()
  const [challenge, setChallenge] = useState(null)
  const { user } = useContext(AuthContext)
  const userEmail = user?.email

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await axios.get(`/challenges/${id}`)
        setChallenge(res.data)
      } catch (err) {
        console.error("Failed to fetch challenge:", err)
      }
    }
    fetchChallenge()
  }, [id])

  const handleJoin = async () => {
    if (!userEmail) {
      alert("Please log in to join the challenge.")
      return
    }

    try {
      const res = await axios.patch(`/challenges/join/${id}`, { userEmail })
      setChallenge(res.data.challenge)
    } catch (err) {
      console.error("Failed to join challenge:", err)
    }
  }

  if (!challenge) return <LoadingSpinner />

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={challenge.imageUrl}
        alt={challenge.title}
        className="rounded mb-4"
      />
      <h1 className="text-3xl font-bold">{challenge.title}</h1>
      <p>{challenge.description}</p>
      <p className="mt-2 text-sm text-base-content">
        Category: {challenge.category} • Impact: {challenge.impactMetric}
      </p>
      <p className="mt-2 text-sm text-base-content">
        Participants: {challenge.participants}
      </p>
    </div>
  )
}
