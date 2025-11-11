import { useState } from "react"

export default function ChallengeCard({ challenge, onJoin }) {
  const [joining, setJoining] = useState(false)

  const handleClick = async () => {
    setJoining(true)
    await onJoin(challenge._id)
    setJoining(false)
  }

  return (
    <div className="card bg-base-100 shadow-md p-6">
      <h4 className="text-lg font-bold">{challenge.title}</h4>
      <p className="text-sm text-gray-500">{challenge.category}</p>
      <p>{challenge.description}</p>
      <p className="text-sm text-gray-400">
        Duration: {challenge.duration} days
      </p>
      <p className="text-sm text-gray-400">Impact: {challenge.impactMetric}</p>
      <button
        onClick={handleClick}
        className={`btn btn-success mt-4 ${joining ? "btn-disabled" : ""}`}
        disabled={joining}
      >
        {joining ? "Joining..." : "Join Challenge"}
      </button>
    </div>
  )
}
