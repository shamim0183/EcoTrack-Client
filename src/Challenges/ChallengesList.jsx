import { useEffect, useState} from "react"
import axios from "../api/axios"
import ChallengeCard from "../components/ChallengeCard"
import SkeletonCard from "../components/SkeletonCard"
import { toast } from "react-toastify"

export default function ChallengesList() {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedCategories, setSelectedCategories] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [minParticipants, setMinParticipants] = useState("")
  const [maxParticipants, setMaxParticipants] = useState("")

  const fetchFilteredChallenges = async () => {
    try {
      setLoading(true)
      const params = {}

      if (selectedCategories.length > 0) {
        params.categories = selectedCategories.join(",")
      }
      if (startDate) params.startDate = startDate
      if (endDate) params.endDate = endDate
      if (minParticipants) params.minParticipants = minParticipants
      if (maxParticipants) params.maxParticipants = maxParticipants

      const res = await axios.get("/challenges/filter", { params })
      setChallenges(res.data)
    } catch (err) {
      toast.error("Failed to load challenges")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFilteredChallenges()
  }, [
    selectedCategories,
    startDate,
    endDate,
    minParticipants,
    maxParticipants,
  ])

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleJoin = async (challengeId) => {
    try {
      await axios.post("/user-challenges/join", {
        challengeId,
        
      })
      toast.success("Challenge joined!")
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info("You've already joined this challenge.")
      } else {
        toast.error("Failed to join challenge")
        console.error(err)
      }
    }
  }

  const handleDelete = (deletedId) => {
    setChallenges((prev) => prev.filter((c) => c._id !== deletedId))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Browse Challenges</h2>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <label className="font-semibold block mb-1">Categories</label>
          <div className="flex flex-wrap gap-2">
            {[
              "Waste Reduction",
              "Energy Saving",
              "Water Conservation",
              "Recycling",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryToggle(cat)}
                className={`btn btn-sm ${
                  selectedCategories.includes(cat)
                    ? "btn-primary"
                    : "btn-outline"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="input input-bordered"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              className="input input-bordered"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium">
              Min Participants
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={minParticipants}
              onChange={(e) => setMinParticipants(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Max Participants
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
        ) : challenges.length === 0 ? (
          <p>No challenges found.</p>
        ) : (
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge._id}
              challenge={challenge}
              onJoin={handleJoin}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
