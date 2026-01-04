import { useContext, useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

export default function EditTip() {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const res = await axios.get(`/tips/${id}`)
        const tip = res.data

        if (tip.author !== user?.email) {
          toast.error("Access denied: You can't edit this tip.")
          navigate("/tips")
          return
        }

        setFormData({
          title: tip.title || "",
          category: tip.category || "",
          content: tip.content || "",
        })
      } catch (err) {
        toast.error("Failed to load tip")
        console.error(err)
      }
    }

    if (id && user?.email) fetchTip()
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
      await axios.patch(`/tips/${id}`, formData)
      toast.success("Tip updated successfully!")
      navigate("/tips")
    } catch (err) {
      toast.error("Failed to update tip")
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
            <h1 className="text-4xl font-bold text-gray-900">Edit Tip</h1>
          </div>
          <p className="text-gray-600">
            Update your tip details and save changes.
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

            {/* Content */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Tip Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Share your eco tip in detail..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400 min-h-[150px]"
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
                    Update Tip
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
