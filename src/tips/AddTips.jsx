import { useState,  use } from "react"
import axios from "../api/axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthContext } from "../context/AuthContext";

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

    const payload = {
      ...formData,
      author: user.email,
      authorName: user.displayName,
      upvotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
if (!formData.title.trim()) {
  toast.error("Title is required")
  return
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
    <div className="p-6 bg-white rounded shadow ">
      <h2 className="text-3xl font-bold mb-6">Share Eco Tip</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Tip Title"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Tip Content"
          className="textarea textarea-bordered w-full"
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
          <option>Waste Management</option>
          <option>Energy Conservation</option>
          <option>Water Conservation</option>
          <option>Green Living</option>
        </select>

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Sharing…
            </span>
          ) : (
            "Share Tip"
          )}
        </button>
      </form>
    </div>
  )
}
