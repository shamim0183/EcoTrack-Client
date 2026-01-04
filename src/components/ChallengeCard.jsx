import { useContext, useState } from "react"
import { FaClock, FaEdit, FaLeaf, FaTrash, FaUsers } from "react-icons/fa"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

export default function ChallengeCard({
  challenge,
  onJoin = () => {},
  onDelete = () => {},
}) {
  const { user } = useContext(AuthContext)
  const [joining, setJoining] = useState(false)
  const navigate = useNavigate()

  const handleJoin = async () => {
    if (!user?.email) {
      navigate("/login")
      return
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
      onDelete(challenge._id)
    } catch (err) {
      toast.error("Failed to delete challenge")
      console.error(err)
    }
  }

  const handleCardClick = () => {
    navigate(`/challenges/${challenge._id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-eco-primary text-white shadow-md">
            {challenge.category}
          </span>
        </div>
        {/* Duration Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
            <FaClock className="text-xs" />
            {challenge.duration} DAYS
          </span>
        </div>
      </div>

      {/* Content - Grows to fill space */}
      <div className="p-5 flex-1 flex flex-col min-h-[280px]">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[56px]">
          {challenge.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[60px]">
          {challenge.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <FaLeaf className="text-eco-primary" />
            <span className="font-semibold text-gray-900">
              {challenge.impactMetric}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-blue-500" />
            <span className="font-semibold text-gray-900">
              {challenge.participantCount || challenge.participants || 0}
            </span>
          </div>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>
        <div className="mt-auto">
          {/* Action Buttons */}
          {user?.email === challenge.createdBy ? (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleEdit}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleJoin()
              }}
              className={`w-full bg-eco-primary hover:bg-eco-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg ${
                joining ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={joining}
            >
              {joining ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Joining...
                </span>
              ) : (
                "Join Challenge"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
