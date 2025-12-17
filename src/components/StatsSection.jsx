import { FaUsers } from "react-icons/fa"

export default function StatsSection({ stats }) {
  const statsData = [
    {
      icon: <span className="text-4xl">🌳</span>,
      value: stats.co2Saved || "1.2M",
      label: "CO₂ Saved",
      unit: "kg",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      icon: <span className="text-4xl">💧</span>,
      value: stats.plasticReduced || "500K",
      label: "Plastic Reduced",
      unit: "kg",
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      icon: <span className="text-4xl">🚴</span>,
      value: stats.energySaved || "300",
      label: "Eco Miles",
      unit: "km",
      gradient: "from-amber-400 to-orange-600",
    },
    {
      icon: <FaUsers className="text-4xl" />,
      value: "2.5K",
      label: "Active Users",
      unit: "+",
      gradient: "from-purple-400 to-pink-600",
    },
  ]

  return (
    <section className="relative py-16 bg-gradient-to-br from-eco-primary-dark to-eco-primary overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-eco-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🌍 Our Collective Impact
          </h2>
          <p className="text-lg text-eco-cream">
            Together, we're making a real difference for our planet
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="glass-strong rounded-eco p-6 text-center hover:scale-105 transition-transform duration-300 shadow-glass"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div
                className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
              >
                {stat.value}
                {stat.unit}
              </div>
              <div className="text-sm md:text-base font-medium text-white">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
