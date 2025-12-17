import { motion } from "framer-motion"
import { FaLeaf, FaTrophy } from "react-icons/fa"
import { Link } from "react-router"

// Mock data - replace with real API data
const topEcoWarriors = [
  {
    id: 1,
    name: "Alex Green",
    username: "@alexgreen",
    image: "https://i.pravatar.cc/200?img=11",
    co2Saved: "5.2 tons",
    challengesCompleted: 28,
    rank: 1,
    badges: ["🏆", "🌟", "⭐"],
  },
  {
    id: 2,
    name: "Sophia Earth",
    username: "@sophiaearth",
    image: "https://i.pravatar.cc/200?img=12",
    co2Saved: "4.8 tons",
    challengesCompleted: 25,
    rank: 2,
    badges: ["🥈", "🌟", "💚"],
  },
  {
    id: 3,
    name: "James Forest",
    username: "@jamesforest",
    image: "https://i.pravatar.cc/200?img=13",
    co2Saved: "4.5 tons",
    challengesCompleted: 23,
    rank: 3,
    badges: ["🥉", "⭐", "🌱"],
  },
  {
    id: 4,
    name: "Maria Ocean",
    username: "@mariaocean",
    image: "https://i.pravatar.cc/200?img=14",
    co2Saved: "4.1 tons",
    challengesCompleted: 21,
    rank: 4,
    badges: ["🌟", "💧", "🌊"],
  },
]

export default function TopEcoWarriorsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-eco-cream via-white to-eco-sand">
      <div className="max-w-screen-2xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            🏆 Top Eco-Warriors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Meet our sustainability champions leading the charge for a greener
            planet
          </motion.p>
        </div>

        {/* Warriors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {topEcoWarriors.map((warrior, index) => (
            <motion.div
              key={warrior.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all relative overflow-hidden">
                {/* Rank Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0
                        ? "bg-amber-500"
                        : index === 1
                        ? "bg-gray-400"
                        : index === 2
                        ? "bg-orange-600"
                        : "bg-eco-primary"
                    }`}
                  >
                    #{warrior.rank}
                  </div>
                </div>

                {/* Profile Image */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative">
                    <img
                      src={warrior.image}
                      alt={warrior.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-eco-primary/20"
                    />
                    {index === 0 && (
                      <div className="absolute -bottom-2 -right-2 text-3xl">
                        👑
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mt-4">
                    {warrior.name}
                  </h3>
                  <p className="text-sm text-gray-500">{warrior.username}</p>

                  {/* Badges */}
                  <div className="flex gap-1 mt-2">
                    {warrior.badges.map((badge, i) => (
                      <span key={i} className="text-2xl">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-eco-cream rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <FaLeaf className="text-eco-primary" />
                      <span>CO₂ Saved</span>
                    </div>
                    <span className="font-bold text-eco-primary">
                      {warrior.co2Saved}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-eco-cream rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <FaTrophy className="text-amber-500" />
                      <span>Challenges</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {warrior.challengesCompleted}
                    </span>
                  </div>
                </div>

                {/* View Profile Button */}
                <Link
                  to={`/profile/${warrior.id}`}
                  className="block w-full text-center bg-eco-success hover:bg-eco-primary-dark text-white font-bold py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                  style={{ color: "#ffffff" }}
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/leaderboard"
            className="inline-flex items-center gap-2 text-eco-primary hover:text-eco-primary-dark font-semibold text-lg"
          >
            View Full Leaderboard
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
