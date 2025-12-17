export default function WhyGoGreenSection() {
  const benefits = [
    {
      icon: "🌍",
      title: "Reduce Carbon Footprint",
      description:
        "Lower your environmental impact and help combat climate change",
    },
    {
      icon: "💰",
      title: "Save Money",
      description:
        "Sustainable habits often lead to reduced energy and resource costs",
    },
    {
      icon: "🌱",
      title: "Protect Resources",
      description: "Preserve natural resources for future generations",
    },
    {
      icon: "❤️",
      title: "Improve Health",
      description:
        "Cleaner air, water, and environment benefit everyone's wellbeing",
    },
    {
      icon: "🤝",
      title: "Inspire Others",
      description: "Your actions motivate friends and family to go green too",
    },
    {
      icon: "🌈",
      title: "Build Better Future",
      description: "Create a sustainable world for generations to come",
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-eco-cream to-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-eco-secondary rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-eco-accent rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-eco-primary-dark mb-4">
            🌿 Why Go Green?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the incredible benefits of sustainable living
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-eco-sm p-8 shadow-eco hover:shadow-eco-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-eco-primary mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
