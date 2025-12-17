import { useContext, useState } from "react"
import {
  FaCalendarAlt,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

export default function AddEvents() {
  const { user } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxParticipants: 50,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxParticipants" ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user?.email) {
      toast.error("You must be logged in to create an event.")
      return
    }

    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    if (formData.maxParticipants > 50) {
      toast.error("Max participants cannot exceed 50")
      return
    }

    const payload = {
      ...formData,
      organizer: user.email,
      currentParticipants: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      setLoading(true)
      await axios.post("/events", payload)
      toast.success("Event created successfully!")
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        maxParticipants: 50,
      })
    } catch (err) {
      toast.error("Failed to create event")
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
            <div className="flex items-center gap-3 mb-2">
              <FaCalendarAlt className="text-4xl text-blue-500" />
              <h1 className="text-4xl font-bold text-gray-900">
                Create New Event
              </h1>
            </div>
            <p className="text-gray-600">
              Organize an eco-friendly event and bring the community together
              for a greener future!
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
                <p className="mt-1 text-sm text-gray-500">
                  Give your event a descriptive and engaging name
                </p>
              </div>

              {/* Event Description */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Event Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the event, what to bring, what activities are planned..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400 min-h-[120px]"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Include important details and what participants should expect
                </p>
              </div>

              {/* Date and Location Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Event Date & Time */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-eco-primary" />
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

                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
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
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaUsers className="text-green-600" />
                  Maximum Participants *
                </label>
                <input
                  name="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  placeholder="50"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                  required
                  min={1}
                  max={50}
                />
                <div className="mt-2 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-900">
                    <strong>Limit:</strong> Maximum 50 participants per event
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className={`w-full bg-eco-success hover:bg-eco-primary-dark text-white font-bold text-lg py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  style={{ color: "#ffffff" }}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="loading loading-spinner loading-md"></span>
                      Creating Event...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaCalendarAlt />
                      Create Event
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              Event Planning Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 ml-6 list-disc">
              <li>
                Choose a date and time that works for most people (weekends are
                usually best)
              </li>
              <li>
                Pick an accessible location with parking or public transport
                nearby
              </li>
              <li>
                Clearly state what participants should bring (water, gloves,
                etc.)
              </li>
              <li>Have a backup plan in case of bad weather</li>
              <li>
                Follow up with participants before the event to confirm
                attendance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
