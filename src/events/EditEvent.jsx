import { useContext, useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

export default function EditEvent() {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxParticipants: 50,
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/${id}`)
        const event = res.data

        if (event.organizer !== user?.email) {
          toast.error("Access denied: You can't edit this event.")
          navigate("/events")
          return
        }

        setFormData({
          title: event.title || "",
          description: event.description || "",
          date: event.date?.slice(0, 16) || "",
          location: event.location || "",
          maxParticipants: event.maxParticipants || 50,
        })
      } catch (err) {
        toast.error("Failed to load event")
        console.error(err)
      }
    }

    if (id && user?.email) fetchEvent()
  }, [id, user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxParticipants" ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    try {
      setLoading(true)
      await axios.patch(`/events/${id}`, formData)
      toast.success("Event updated successfully!")
      navigate("/events")
    } catch (err) {
      toast.error("Failed to update event")
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
            <h1 className="text-4xl font-bold text-gray-900">Edit Event</h1>
          </div>
          <p className="text-gray-600">
            Update your event details and save changes.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <div className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Event Title *
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Community Beach Cleanup"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the event..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400 min-h-[120px]"
                required
              />
            </div>

            {/* Date and Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Event Date & Time *
                </label>
                <input
                  name="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Location *
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Central Park, New York"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Max Participants */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Maximum Participants *
              </label>
              <input
                name="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900"
                required
                min={1}
                max={50}
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
                    Update Event
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
