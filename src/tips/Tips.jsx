import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "../api/axios"

export default function Tips() {
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Energy", "Water", "Waste", "Transport", "Food"]

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
              onClick={() => setSelectedCategory(cat)}
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
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-eco"
              />
            ))}
          </div>
        ) : tips.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No tips available yet.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tips.map((tip, index) => (
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

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-eco-primary hover:text-eco-primary-dark transition-colors">
                    <span>👍</span>
                    <span className="font-semibold">{tip.upvotes || 0}</span>
                  </button>
                  {tip.category && (
                    <span className="px-3 py-1 bg-eco-sand text-eco-primary text-sm rounded-full font-medium">
                      {tip.category}
                    </span>
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
