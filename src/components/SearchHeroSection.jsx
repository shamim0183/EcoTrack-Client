import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
  FaCalendar,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaSearch,
} from "react-icons/fa"
import { useNavigate } from "react-router"

export default function SearchHeroSection() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchData, setSearchData] = useState({
    keyword: "",
    category: "",
    duration: "",
  })

  const slides = [
    {
      title: "Find Your Next",
      highlight: "Eco Challenge",
      subtitle: "Join thousands of eco-warriors making real impact",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80",
    },
    {
      title: "Track Your",
      highlight: "Environmental Impact",
      subtitle: "Monitor your progress and see the difference you make",
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1920&q=80",
    },
    {
      title: "Join The",
      highlight: "Green Movement",
      subtitle: "Connect with eco-warriors worldwide and create change",
      image:
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80",
    },
  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

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
    const params = new URLSearchParams()
    if (searchData.keyword) params.append("search", searchData.keyword)
    if (searchData.category && searchData.category !== "All Categories")
      params.append("category", searchData.category)
    if (searchData.duration && searchData.duration !== "Any Duration")
      params.append("duration", searchData.duration)
    navigate(`/challenges?${params.toString()}`)
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-[60vh] md:h-[65vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-gray-900/80" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
        aria-label="Next slide"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 py-8 md:py-12 text-center w-full">
        {/* Animated Heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4">
              {slides[currentSlide].title}
              <br />
              <span className="text-eco-primary-light">
                {slides[currentSlide].highlight}
              </span>
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Search Box */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-3 md:p-6 shadow-xl max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            {/* Keyword Search */}
            <div className="md:col-span-1">
              <label className="block text-left text-xs md:text-sm font-semibold text-gray-700 mb-2">
                <FaSearch className="inline mr-2" />
                Search
              </label>
              <input
                type="text"
                placeholder="Plastic free..."
                value={searchData.keyword}
                onChange={(e) =>
                  setSearchData({ ...searchData, keyword: e.target.value })
                }
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary text-sm md:text-base"
              />
            </div>

            {/* Category */}
            <div className="md:col-span-1">
              <label className="block text-left text-xs md:text-sm font-semibold text-gray-700 mb-2">
                <FaFilter className="inline mr-2" />
                Category
              </label>
              <select
                value={searchData.category}
                onChange={(e) =>
                  setSearchData({ ...searchData, category: e.target.value })
                }
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary bg-white text-sm md:text-base"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className="md:col-span-1">
              <label className="block text-left text-xs md:text-sm font-semibold text-gray-700 mb-2">
                <FaCalendar className="inline mr-2" />
                Duration
              </label>
              <select
                value={searchData.duration}
                onChange={(e) =>
                  setSearchData({ ...searchData, duration: e.target.value })
                }
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary bg-white text-sm md:text-base"
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
                className="w-full bg-eco-primary hover:bg-eco-primary-dark text-white font-semibold py-2 md:py-3 px-4 md:px-8 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm md:text-base"
              >
                Find Challenges
              </button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-eco-primary w-8"
                : "bg-white/50 hover:bg-white/80 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white hidden md:flex flex-col items-center gap-2 cursor-pointer"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight * 0.7, behavior: "smooth" })
        }
      >
        <span className="text-xs md:text-sm font-medium">Scroll Down</span>
        <FaChevronDown size={16} />
      </motion.div>
    </section>
  )
}
