import { motion } from "framer-motion"
import { FaHome, FaLeaf } from "react-icons/fa"
import { Link } from "react-router"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-cream via-white to-eco-sand flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-eco-primary-light mb-4">
            404
          </div>
          <div className="text-6xl mb-4">🌿</div>
        </motion.div>

        {/* Message */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-600 mb-8"
        >
          Oops! Looks like this page took a detour to plant some trees. 🌳
          <br />
          The page you're looking for doesn't exist.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-eco-success hover:bg-eco-primary-dark text-white font-bold px-8 py-3 rounded-lg transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            style={{ color: "#ffffff" }}
          >
            <FaHome />
            Back to Home
          </Link>
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-eco-primary border-2 border-eco-primary font-semibold px-8 py-3 rounded-lg transition-all"
          >
            <FaLeaf />
            Browse Challenges
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-12 text-6xl opacity-20"
        >
          🍃
        </motion.div>
      </motion.div>
    </div>
  )
}
