import { use, useState } from "react"
import { FaInfoCircle, FaLightbulb } from "react-icons/fa"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

export default function AddTips() {
  const { user } = use(AuthContext)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user?.email) {
      toast.error("You must be logged in to share a tip.")
      return
    }

    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    const payload = {
      ...formData,
      author: user.email,
      authorName: user.displayName,
      upvotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      setLoading(true)
      await axios.post("/tips", payload)
      toast.success("Tip shared successfully!")
      setFormData({ title: "", content: "", category: "" })
    } catch (err) {
      toast.error("Failed to share tip")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <FaLightbulb className="text-4xl text-amber-500" />
              <h1 className="text-4xl font-bold text-gray-900">
                Share Eco Tip
              </h1>
            </div>
            <p className="text-gray-600">
              Share your eco-friendly knowledge and help others make sustainable
              choices!
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <div className="space-y-6">
              {/* Tip Title */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Tip Title *
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Easy Way to Reduce Plastic Waste"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Make it clear and catchy to grab attention
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

              {/* Tip Content */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Tip Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Share your eco tip in detail. Include practical steps and benefits..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400 min-h-[150px]"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Provide actionable advice that others can easily follow
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
                      Sharing Tip...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaLightbulb />
                      Share Tip
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FaInfoCircle className="text-amber-600" />
              Tips for Great Eco Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 ml-6 list-disc">
              <li>
                Be specific and actionable - tell people exactly what to do
              </li>
              <li>Include why it matters for the environment</li>
              <li>Keep it simple so anyone can follow along</li>
              <li>Share your personal experience if you've tried it</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
