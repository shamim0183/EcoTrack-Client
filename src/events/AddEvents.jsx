import { useState,  use } from "react"
import axios from "../api/axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthContext } from "../context/AuthContext";

export default function AddEvents() {
  const { user } = use(AuthContext)

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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user?.email) {
      toast.error("You must be logged in to create an event.")
      return
    }

    const payload = {
      ...formData,
      organizer: user.email,
      currentParticipants: 0,
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />

        <input
          name="maxParticipants"
          type="number"
          value={formData.maxParticipants}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Creating…
            </span>
          ) : (
            "Create Event"
          )}
        </button>
      </form>
    </div>
  )
}
