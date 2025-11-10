import { use, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext";

const AddTips = () => {
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
    if (!user?.email) return toast.error("Login required")

    const payload = {
      ...formData,
      author: user.email,
      authorName: user.displayName,
      upvotes: 0,
      createdAt: new Date().toISOString(),
    }

    try {
      setLoading(true)
      await axios.post("http://localhost:5000/api/tips", payload)
      toast.success("Tip added successfully!")
      setFormData({ title: "", content: "", category: "" })
    } catch (err) {
      toast.error(err.message || "Failed to add tip")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Add a Sustainability Tip</h2>
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
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
          disabled={loading}
        >
          {loading ? "Submitting…" : "Submit Tip"}
        </button>
      </form>
    </div>
  )
}

export default AddTips
