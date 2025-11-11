import { use, useState } from "react"
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

    const payload = {
      ...formData,
      createdBy: user.email,
      participants: 0,
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Add New Challenge</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Category</option>
          <option>Energy Conservation</option>
          <option>Water Conservation</option>
          <option>Sustainable Transport</option>
          <option>Green Living</option>
          <option>Waste Reduction</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          name="duration"
          type="number"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (days)"
          className="input input-bordered w-full"
          required
        />

        <input
          name="target"
          value={formData.target}
          onChange={handleChange}
          placeholder="Target Goal"
          className="input input-bordered w-full"
          required
        />

        <input
          name="impactMetric"
          value={formData.impactMetric}
          onChange={handleChange}
          placeholder="Impact Metric (e.g. kg plastic saved)"
          className="input input-bordered w-full"
          required
        />

        <input
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
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
            "Create Challenge"
          )}
        </button>
      </form>
    </div>
  )
}
