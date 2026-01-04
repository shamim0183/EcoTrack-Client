import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

export default function Tips() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
    "Waste Reduction",
  ]

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/tips")
        setTips(res.data)
      } catch (err) {
        toast.error("Failed to load tips")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTips()
  }, [])

  const handleCategoryChange = (cat) => {
    setCategoryLoading(true)
    setSelectedCategory(cat)
    setTimeout(() => setCategoryLoading(false), 300)
  }

  const handleLike = async (tipId) => {
    try {
      const userEmail = "user@example.com" // TODO: Get from auth context
      const res = await axios.patch(`/tips/like/${tipId}`, { userEmail })
      // Update tips with new like count from response
      setTips((prevTips) =>
        prevTips.map((tip) =>
          tip._id === tipId
            ? {
                ...tip,
                likes: res.data.likes,
                upvotes: res.data.likes?.length || 0,
              }
            : tip
        )
      )
      toast.success("Liked!")
    } catch (err) {
      toast.error("Failed to like tip")
      console.error(err)
    }
  }

  const handleEdit = (tipId) => {
    navigate(`/tip/edit/${tipId}`)
  }

  const handleDelete = async (tipId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This tip will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (!result.isConfirmed) return

    try {
      await axios.delete(`/tips/${tipId}`)
      toast.success("Tip deleted")
      setTips((prev) => prev.filter((t) => t._id !== tipId))
    } catch (err) {
      toast.error("Failed to delete tip")
      console.error(err)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-cream via-white to-eco-sand">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-eco-primary to-eco-primary-light text-white py-20">
        <div className="max-w-screen-2xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            💡 Eco-Friendly Living Tips
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-eco-cream max-w-2xl mx-auto"
          >
            Learn from our community's best sustainable practices and make a
            difference today
          </motion.p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-eco-primary text-white shadow-eco"
                  : "bg-white text-eco-primary hover:bg-eco-primary hover:text-white shadow-md"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 pb-20">
        {loading || categoryLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-eco"
              />
            ))}
          </div>
        ) : tips.filter((tip) =>
            selectedCategory === "All"
              ? true
              : tip.category === selectedCategory
          ).length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💡</div>
            <p className="text-2xl text-gray-900 font-bold mb-2">
              No {selectedCategory !== "All" && selectedCategory} Tips Found
            </p>
            <p className="text-gray-500">
              {selectedCategory === "All"
                ? "No tips available yet. Check back soon!"
                : `No tips in the ${selectedCategory} category yet.`}
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tips
              .filter((tip) =>
                selectedCategory === "All"
                  ? true
                  : tip.category === selectedCategory
              )
              .map((tip, index) => (
                <motion.div
                  key={tip._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-eco p-6 shadow-eco hover:shadow-eco-lg transition-all border-l-4 border-eco-accent"
                >
                  {/* Icon based on category */}
                  <div className="text-5xl mb-4">
                    {tip.category === "Energy" && "⚡"}
                    {tip.category === "Water" && "💧"}
                    {tip.category === "Waste" && "♻️"}
                    {tip.category === "Transport" && "🚴"}
                    {tip.category === "Food" && "🍃"}
                    {!tip.category && "💡"}
                  </div>

                  <h3 className="text-xl font-bold text-eco-primary-dark mb-3">
                    {tip.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {tip.description ||
                      "Learn essential tips for sustainable living."}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By {tip.authorName || "EcoTrack"}</span>
                    <span>{new Date(tip.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      {tip.category && (
                        <span className="px-3 py-1 bg-eco-sand text-eco-primary text-sm rounded-full font-medium">
                          {tip.category}
                        </span>
                      )}
                    </div>

                    {/* Admin Edit/Delete */}
                    {user?.email === tip.author && (
                      <div className="flex gap-2 pt-2 border-t border-gray-200">
                        <button
                          onClick={() => handleEdit(tip._id)}
                          className="flex-1 flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-3 rounded-lg transition text-sm"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tip._id)}
                          className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition text-sm"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
