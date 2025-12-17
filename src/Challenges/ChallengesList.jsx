import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaCalendar, FaFilter, FaTimes, FaUsers } from "react-icons/fa"
import { toast } from "react-toastify"
import axios from "../api/axios"
import ChallengeCard from "../components/ChallengeCard"
import SkeletonCard from "../components/SkeletonCard"

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
  }, [selectedCategories, startDate, endDate, minParticipants, maxParticipants])

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setStartDate("")
    setEndDate("")
    setMinParticipants("")
    setMaxParticipants("")
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

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    startDate ||
    endDate ||
    minParticipants ||
    maxParticipants

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-eco-primary to-eco-primary-dark text-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4">Browse Challenges</h1>
            <p className="text-xl text-gray-100 max-w-3xl">
              Join popular challenges and start making an impact today
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 py-10">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FaFilter className="text-eco-primary text-xl" />
              <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                <FaTimes />
                Clear All Filters
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Categories */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Waste Reduction",
                  "Water Conservation",
                  "Sustainable Transport",
                  "Green Living",
                  "Energy Conservation",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedCategories.includes(cat)
                        ? "bg-eco-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaCalendar className="text-eco-primary" />
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaCalendar className="text-eco-primary" />
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* Participants Range */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaUsers className="text-eco-primary" />
                  Min Participants
                </label>
                <input
                  type="number"
                  placeholder="e.g., 5"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  value={minParticipants}
                  onChange={(e) => setMinParticipants(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaUsers className="text-eco-primary" />
                  Max Participants
                </label>
                <input
                  type="number"
                  placeholder="e.g., 100"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {loading ? (
              "Loading..."
            ) : (
              <>
                {challenges.length} Challenge
                {challenges.length !== 1 ? "s" : ""} Found
              </>
            )}
          </h3>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          ) : challenges.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                <FaFilter className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Challenges Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to see more results
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="bg-eco-primary hover:bg-eco-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            challenges.map((challenge, index) => (
              <motion.div
                key={challenge._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ChallengeCard
                  challenge={challenge}
                  onJoin={handleJoin}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
