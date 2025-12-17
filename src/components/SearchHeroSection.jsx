import { motion } from "framer-motion"
import { useState } from "react"
import { FaCalendar, FaFilter, FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router"

export default function SearchHeroSection() {
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState({
    keyword: "",
    category: "",
    duration: "",
  })

  const categories = [
    "All Categories",
    "Waste Reduction",
    "Water Conservation",
    "Energy Saving",
    "Sustainable Transport",
    "Eco-Friendly Food",
  ]
  const durations = ["Any Duration", "7 Days", "30 Days", "90 Days", "1 Year"]

  const handleSearch = (e) => {
    e.preventDefault()
    // Navigate to challenges list with filters
    const params = new URLSearchParams()
    if (searchData.keyword) params.append("search", searchData.keyword)
    if (searchData.category && searchData.category !== "All Categories")
      params.append("category", searchData.category)
    if (searchData.duration && searchData.duration !== "Any Duration")
      params.append("duration", searchData.duration)
    navigate(`/challenges?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80')",
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Find Your Next
            <br />
            <span className="text-eco-primary-light">Eco Challenge</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Join thousands of eco-warriors making real impact. Search
            challenges, track progress, and change the world together.
          </p>

          {/* Search Box */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-xl max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-4 gap-4">
              {/* Keyword Search */}
              <div className="md:col-span-1">
                <label className="block text-left text-sm font-semibold text-gray-700 mb-2">
                  <FaSearch className="inline mr-2" />
                  Search Challenge
                </label>
                <input
                  type="text"
                  placeholder="Plastic free, recycling..."
                  value={searchData.keyword}
                  onChange={(e) =>
                    setSearchData({ ...searchData, keyword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-1">
                <label className="block text-left text-sm font-semibold text-gray-700 mb-2">
                  <FaFilter className="inline mr-2" />
                  Category
                </label>
                <select
                  value={searchData.category}
                  onChange={(e) =>
                    setSearchData({ ...searchData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div className="md:col-span-1">
                <label className="block text-left text-sm font-semibold text-gray-700 mb-2">
                  <FaCalendar className="inline mr-2" />
                  Duration
                </label>
                <select
                  value={searchData.duration}
                  onChange={(e) =>
                    setSearchData({ ...searchData, duration: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent bg-white"
                >
                  {durations.map((dur) => (
                    <option key={dur} value={dur}>
                      {dur}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="md:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="w-full bg-eco-primary hover:bg-eco-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Find Challenges
                </button>
              </div>
            </div>
          </motion.form>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12 text-white"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-eco-primary-light">
                2,500+
              </div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-eco-primary-light">
                120+
              </div>
              <div className="text-gray-300">Eco Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-eco-primary-light">
                1.2M kg
              </div>
              <div className="text-gray-300">CO₂ Saved</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
