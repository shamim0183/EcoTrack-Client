import { useContext, useEffect, useState } from "react"
import { FaEdit, FaInfoCircle } from "react-icons/fa"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

export default function EditChallenge() {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    target: "",
    impactMetric: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await axios.get(`/challenges/${id}`)
        const challenge = res.data

        if (challenge.createdBy !== user?.email) {
          toast.error("Access denied: You can't edit this challenge.")
          navigate("/challenges")
          return
        }

        setFormData({
          title: challenge.title || "",
          category: challenge.category || "",
          description: challenge.description || "",
          duration: challenge.duration || "",
          target: challenge.target || "",
          impactMetric: challenge.impactMetric || "",
          startDate: challenge.startDate?.slice(0, 10) || "",
          endDate: challenge.endDate?.slice(0, 10) || "",
          imageUrl: challenge.imageUrl || "",
        })
      } catch (err) {
        toast.error("Failed to load challenge")
        console.error(err)
      }
    }

    if (id && user?.email) fetchChallenge()
  }, [id, user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    try {
      setLoading(true)
      await axios.patch(`/challenges/${id}`, formData)
      toast.success("Challenge updated successfully!")
      navigate("/challenges")
    } catch (err) {
      toast.error("Failed to update challenge")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaEdit className="text-4xl text-eco-primary" />
            <h1 className="text-4xl font-bold text-gray-900">Edit Challenge</h1>
          </div>
          <p className="text-gray-600">
            Update your challenge details and save changes to keep participants
            informed.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <div className="space-y-6">
            {/* Challenge Title */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Challenge Title *
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., 30-Day Plastic-Free Challenge"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 bg-white"
                required
              >
                <option value="">Select a category...</option>
                <option>Energy Conservation</option>
                <option>Water Conservation</option>
                <option>Sustainable Transport</option>
                <option>Green Living</option>
                <option>Waste Reduction</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your challenge in detail..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400 min-h-[120px]"
                required
              />
            </div>

            {/* Duration and Target in Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Duration (Days) *
                </label>
                <input
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 30"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Target Goal *
                </label>
                <input
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  placeholder="e.g., Reduce plastic waste by 50%"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Impact Metric */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Impact Metric *
              </label>
              <input
                name="impactMetric"
                type="text"
                value={formData.impactMetric}
                onChange={handleChange}
                placeholder="e.g., 15kg or 20kWh"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                required
              />
              <div className="mt-2 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900">
                  <strong>Format:</strong> Number + Unit (no space)
                  <br />
                  <strong>Examples:</strong> 15kg, 20kWh, 100L, 500g
                </p>
              </div>
            </div>

            {/* Dates in Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Start Date *
                </label>
                <input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  End Date *
                </label>
                <input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Image URL *
              </label>
              <input
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className={`w-full bg-eco-primary hover:bg-eco-primary-dark text-white font-bold text-lg py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="loading loading-spinner loading-md"></span>
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaEdit />
                    Update Challenge
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
