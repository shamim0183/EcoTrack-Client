import { motion } from "framer-motion"
import { Link } from "react-router"

const categories = [
  {
    id: 1,
    name: "Waste Reduction",
    icon: "🗑️",
    count: 24,
    color: "from-emerald-500 to-teal-600",
    description: "Reduce, reuse, recycle",
  },
  {
    id: 2,
    name: "Water Conservation",
    icon: "💧",
    count: 18,
    color: "from-blue-500 to-cyan-600",
    description: "Save every drop",
  },
  {
    id: 3,
    name: "Energy Saving",
    icon: "⚡",
    count: 32,
    color: "from-amber-500 to-orange-600",
    description: "Power the future wisely",
  },
  {
    id: 4,
    name: "Sustainable Transport",
    icon: "🚴",
    count: 15,
    color: "from-green-500 to-emerald-600",
    description: "Go green on the go",
  },
  {
    id: 5,
    name: "Eco-Friendly Food",
    icon: "🍃",
    count: 21,
    color: "from-lime-500 to-green-600",
    description: "Eat for the planet",
  },
  {
    id: 6,
    name: "Tree Planting",
    icon: "🌳",
    count: 12,
    color: "from-green-600 to-emerald-700",
    description: "Grow a greener future",
  },
]

export default function CategoryBrowseGrid() {
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
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Browse by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Explore challenges across different sustainability focus areas
          </motion.p>
        </div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Link
                to={`/challenges?category=${encodeURIComponent(category.name)}`}
                className="block h-full"
              >
                <div
                  className={`relative overflow-hidden rounded-xl p-8 h-full bg-gradient-to-br ${category.color} shadow-md hover:shadow-xl transition-all`}
                >
                  {/* Icon */}
                  <div className="text-6xl mb-4">{category.icon}</div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/90 mb-4">{category.description}</p>

                  {/* Count Badge */}
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-semibold">
                    <span className="text-lg">{category.count}</span>
                    <span className="ml-2 text-sm">Challenges</span>
                  </div>

                  {/* Decorative Circle */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/10 rounded-full" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
