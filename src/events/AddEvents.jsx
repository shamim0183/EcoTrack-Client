import { use, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext";

const AddEvents = () => {
  const { user } = use(AuthContext)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxParticipants: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user?.email) return toast.error("Login required")

    const payload = {
      ...formData,
      organizer: user.email,
      currentParticipants: 0,
    }

    try {
      setLoading(true)
      await axios.post("http://localhost:5000/api/events", payload)
      toast.success("Event created successfully!")
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        maxParticipants: "",
      })
    } catch (err) {
      toast.error(err.message || "Failed to create event")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Create a Community Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
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
          placeholder="Max Participants"
          className="input input-bordered w-full"
          required
        />
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
          disabled={loading}
        >
          {loading ? "Submitting…" : "Create Event"}
        </button>
      </form>
    </div>
  )
}

export default AddEvents
