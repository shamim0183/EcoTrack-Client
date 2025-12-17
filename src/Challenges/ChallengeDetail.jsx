import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import {
  FaArrowLeft,
  FaBullseye,
  FaCalendar,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaLeaf,
  FaUsers,
} from "react-icons/fa"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import axios from "../api/axios"
import LoadingSpinner from "../components/LoadingSpinner"
import { AuthContext } from "../context/AuthContext"

export default function ChallengeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [challenge, setChallenge] = useState(null)
  const [joining, setJoining] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await axios.get(`/challenges/${id}`)
        setChallenge(res.data)
      } catch (err) {
        console.error("Failed to fetch challenge:", err)
        toast.error("Failed to load challenge details")
      }
    }
    fetchChallenge()
  }, [id])

  const handleJoin = async () => {
    if (!user?.email) {
      navigate("/login")
      return
    }

    try {
      setJoining(true)
      await axios.post("/user-challenges/join", {
        challengeId: id,
      })
      toast.success("Challenge joined successfully!")
      // Refresh challenge data
      const res = await axios.get(`/challenges/${id}`)
      setChallenge(res.data)
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info("You've already joined this challenge.")
      } else {
        toast.error("Failed to join challenge")
      }
    } finally {
      setJoining(false)
    }
  }

  if (!challenge) return <LoadingSpinner />

  const startDate = challenge.startDate
    ? new Date(challenge.startDate).toLocaleDateString()
    : "Not set"
  const endDate = challenge.endDate
    ? new Date(challenge.endDate).toLocaleDateString()
    : "Not set"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate("/challenges")}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 font-semibold px-4 py-2 rounded-lg transition-all shadow-lg"
        >
          <FaArrowLeft />
          Back to Challenges
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-eco-primary text-white shadow-lg">
                  {challenge.category}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-amber-500 text-white shadow-lg">
                  <FaClock />
                  {challenge.duration} Days
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                {challenge.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl">
                {challenge.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-eco-primary/10 flex items-center justify-center">
                <FaLeaf className="text-2xl text-eco-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Impact Goal</p>
                <p className="text-2xl font-bold text-gray-900">
                  {challenge.impactMetric}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {challenge.participants || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <FaClock className="text-2xl text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-2xl font-bold text-gray-900">
                  {challenge.duration} Days
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FaBullseye className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Target</p>
                <p className="text-lg font-bold text-gray-900 line-clamp-1">
                  {challenge.target}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaChartLine className="text-eco-primary" />
                About This Challenge
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {challenge.description}
              </p>
            </div>

            {/* Challenge Goals */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaBullseye className="text-eco-primary" />
                Challenge Goals
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Primary Target
                    </p>
                    <p className="text-gray-700">{challenge.target}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Environmental Impact
                    </p>
                    <p className="text-gray-700">
                      Save {challenge.impactMetric} of resources over{" "}
                      {challenge.duration} days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Community Building
                    </p>
                    <p className="text-gray-700">
                      Join {challenge.participants || 0} participants making a
                      difference
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaCalendar className="text-eco-primary" />
                Challenge Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Start Date</p>
                    <p className="text-gray-600">{startDate}</p>
                  </div>
                </div>
                <div className="border-l-2 border-gray-300 ml-1.5 h-8"></div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">End Date</p>
                    <p className="text-gray-600">{endDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Join CTA */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ready to Make an Impact?
              </h3>
              <p className="text-gray-600 mb-6">
                Join this challenge and start tracking your progress today!
              </p>
              <button
                onClick={handleJoin}
                className={`w-full bg-eco-primary hover:bg-eco-primary-dark text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
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

              {/* Challenge Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold text-gray-900">
                    {challenge.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-gray-900">
                    {challenge.duration} Days
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-semibold text-green-600">
                    Beginner Friendly
                  </span>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-gradient-to-br from-eco-primary to-eco-primary-dark rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Share This Challenge</h3>
              <p className="text-sm text-gray-100 mb-4">
                Invite friends to join and multiply your impact!
              </p>
              <button className="w-full bg-white text-eco-primary font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all">
                Share Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
