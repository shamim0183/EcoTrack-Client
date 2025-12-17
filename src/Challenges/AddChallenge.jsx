import { use, useState } from "react"
import { FaInfoCircle } from "react-icons/fa"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

export default function AddChallenge() {
  const { user } = use(AuthContext)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user?.email) {
      toast.error("You must be logged in to create a challenge.")
      return
    }

    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    const metricRaw = formData.impactMetric.trim()
    const metricPattern = /^[0-9]+(\.[0-9]+)?[a-zA-Z]+$/
    if (!metricPattern.test(metricRaw)) {
      toast.error(
        "Impact Metric must include a number followed by a unit (e.g. 15kg, 20kWh)"
      )
      return
    }

    try {
      new URL(formData.imageUrl)
    } catch {
      toast.error("Image URL must be a valid URL")
      return
    }

    const payload = {
      ...formData,
      impactMetric: metricRaw.toLowerCase(),
      createdBy: user.email,
      participants: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      setLoading(true)
      await axios.post("/challenges", payload)
      toast.success("Challenge created successfully!")
      setFormData({
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
    } catch (err) {
      toast.error("Failed to create challenge")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Create New Challenge
            </h1>
            <p className="text-gray-600">
              Share your eco-friendly challenge with the community and inspire
              others to make a difference!
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
                <p className="mt-1 text-sm text-gray-500">
                  Choose a clear, engaging title that describes your challenge
                </p>
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
                  placeholder="Describe your challenge in detail. What will participants do? What's the goal?"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400 min-h-[120px]"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Provide clear instructions and expected outcomes
                </p>
              </div>

              {/* Duration and Target in Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Duration */}
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
                  <p className="mt-1 text-sm text-gray-500">
                    How long will the challenge last?
                  </p>
                </div>

                {/* Target Goal */}
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
                  <p className="mt-1 text-sm text-gray-500">
                    What's the measurable goal?
                  </p>
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
                {/* Start Date */}
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

                {/* End Date */}
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
                <p className="mt-1 text-sm text-gray-500">
                  Provide a valid image URL (try Unsplash, Pexels, or Pixabay)
                </p>
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
                      Creating Challenge...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>🌱</span>
                      Create Challenge
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 bg-eco-sand rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FaInfoCircle className="text-eco-primary" />
              Tips for Creating Great Challenges
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 ml-6 list-disc">
              <li>Make your title specific and action-oriented</li>
              <li>
                Clear, step-by-step instructions help participants succeed
              </li>
              <li>Set realistic and measurable goals</li>
              <li>Choose high-quality, relevant images that inspire action</li>
              <li>Include the environmental impact to motivate participants</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
