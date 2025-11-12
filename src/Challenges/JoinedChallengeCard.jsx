
import Swal from "sweetalert2"
import axios from "../api/axios"
import { toast } from "react-toastify"

export default function JoinedChallengeCard({ entry, onRemove }) {
  const challenge = entry.challenge

  const handleRemove = async () => {
    const result = await Swal.fire({
      title: "Remove Challenge?",
      text: "This will delete your progress for this challenge.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it",
    })

    if (!result.isConfirmed) return

    try {
      await axios.delete(`/user-challenges/${entry._id}`)
      toast.success("Challenge removed")
      onRemove?.(entry._id)
    } catch (err) {
      toast.error("Failed to remove challenge")
      console.error(err)
    }
  }

  return (
    <div className="card bg-base-100 shadow-md p-6">
      <img
        src={challenge.imageUrl}
        alt={challenge.title}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h4 className="text-lg font-bold">{challenge.title}</h4>
      <p className="text-sm text-gray-500">{challenge.category}</p>
      <p>{challenge.description}</p>
      <div className="text-sm text-gray-600 mt-2 space-y-1">
        <p>Status: {entry.status}</p>
        <p>Progress: {entry.progress}%</p>
        <p>Joined: {new Date(entry.joinDate).toLocaleDateString()}</p>
        <p>Duration: {challenge.duration} days</p>
        <p>Impact: {challenge.impactMetric}</p>
        <p>Target: {challenge.target}</p>
        <p>
          Dates: {challenge.startDate?.slice(0, 10)} →{" "}
          {challenge.endDate?.slice(0, 10)}
        </p>
      </div>

      <button onClick={handleRemove} className="btn btn-error mt-4 w-full">
        Remove Challenge
      </button>
    </div>
  )
}
