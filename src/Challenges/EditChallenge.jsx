import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import axios from "../api/axios"
import { toast } from "react-toastify"
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

        if (
          challenge.createdBy !== user?.email 
        ) {
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
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Edit Challenge</h2>
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
              Updating…
            </span>
          ) : (
            "Update Challenge"
          )}
        </button>
      </form>
    </div>
  )
}
