import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../context/AuthContext"
import axios from "../api/axios"
import { toast } from "react-toastify"
import Swal from "sweetalert2";

export default function ChallengeCard({ challenge, onJoin, onDelete }) {
  // console.log( onJoin, onDelete)

  const { user } = useContext(AuthContext)
  const [joining, setJoining] = useState(false)
  const navigate = useNavigate()

  const handleJoin = async () => {
    if (!user?.email) {
      navigate("/login");
      return;
    }
    setJoining(true)
    await onJoin(challenge._id)
    setJoining(false)
  }

  const handleEdit = () => {
    navigate(`/edit-challenge/${challenge._id}`)
  }

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This challenge will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (!result.isConfirmed) return

    try {
      await axios.delete(`/challenges/${challenge._id}`)
      toast.success("Challenge deleted")
      onDelete?.(challenge._id)
    } catch (err) {
      toast.error("Failed to delete challenge")
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
        <p>Duration: {challenge.duration} days</p>
        <p>Impact: {challenge.impactMetric}</p>
        <p>Target: {challenge.target}</p>
        <p>Participants: {challenge.participants}</p>
        <p>
          Dates: {challenge.startDate?.slice(0, 10)} →{" "}
          {challenge.endDate?.slice(0, 10)}
        </p>
      </div>
        <button
          onClick={handleJoin}
          className={`btn btn-success mt-4 w-full ${joining ? "btn-disabled" : ""
            }`}
          disabled={joining}
        >
          {joining ? "Joining..." : "Join Challenge"}
        </button>

      {user?.email === challenge.createdBy && (
        <div className="mt-4 flex gap-2">
          <button
            className="btn btn-sm btn-outline btn-warning "
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline btn-error "
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
