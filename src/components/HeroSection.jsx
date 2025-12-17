import { motion } from "framer-motion"
import { FaLeaf } from "react-icons/fa"

export default function HeroSection({ featuredChallenges }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-eco-cream via-white to-eco-sand">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Floating Leaf Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="leaf-particle absolute text-eco-primary opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              fontSize: `${20 + Math.random() * 20}px`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <FaLeaf />
          </div>
        ))}
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-2 shadow-eco hover:shadow-eco-lg transition-all cursor-default"
            >
              <span className="text-2xl">🌿</span>
              <span className="text-sm font-semibold text-eco-primary">
                Providing energy solutions
              </span>
              <span className="text-2xl">📈</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-eco-primary-dark leading-tight"
            >
              Track Your Planet,
              <br />
              <span className="text-eco-primary">Change Your World</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 max-w-xl"
            >
              Join thousands of eco-warriors making a real impact. Track your
              sustainable actions, participate in challenges, and help create a
              greener future together.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <button className="btn-eco hover:scale-105 transition-transform">
                🌱 Start Your Journey
              </button>
              <button className="glass-strong rounded-full px-8 py-3 font-semibold text-eco-primary hover:bg-eco-primary hover:text-white backdrop-blur-lg transition-all">
                Learn More →
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-4"
            >
              {[
                { value: "2.5K+", label: "Active Users" },
                { value: "50+", label: "Challenges" },
                { value: "1.2M", label: "kg CO₂ Saved" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-eco-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative z-10">
              <motion.img
                src="/eco_hero_illustration.png"
                alt="Floating eco island"
                className="w-full h-auto drop-shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Decorative Circles */}
            <motion.div
              className="absolute top-1/4 -left-8 w-32 h-32 bg-eco-secondary rounded-full opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-8 w-40 h-40 bg-eco-accent rounded-full opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
