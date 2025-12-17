export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      icon: "🎯",
      title: "Join a Challenge",
      description:
        "Pick a challenge that fits your lifestyle and goals. From waste reduction to energy conservation.",
    },
    {
      number: "2",
      icon: "📊",
      title: "Track Progress",
      description:
        "Log your eco-friendly actions and watch your impact grow. See real-time statistics of your contribution.",
    },
    {
      number: "3",
      icon: "💡",
      title: "Share & Learn",
      description:
        "Exchange tips with the community. Help others succeed and learn from their sustainable practices.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-eco-primary-dark mb-4">
            ⚡ How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Start your eco journey in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-1">
            <div className="flex justify-between items-center h-full px-32">
              <div className="flex-1 h-1 bg-gradient-to-r from-eco-primary to-eco-accent"></div>
              <div className="w-12"></div>
              <div className="flex-1 h-1 bg-gradient-to-r from-eco-accent to-eco-primary"></div>
            </div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="glass-strong rounded-eco-lg p-8 text-center hover:scale-105 transition-all duration-300 shadow-eco hover:shadow-eco-lg">
                {/* Step Number Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-eco-primary to-eco-accent rounded-full flex items-center justify-center text-white text-xl font-bold shadow-eco">
                    {step.number}
                  </div>
                </div>

                <div className="text-6xl mb-6 mt-6">{step.icon}</div>

                <h3 className="text-2xl font-bold text-eco-primary mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="btn-eco text-lg px-10 py-4">
            🚀 Get Started Now
          </button>
        </div>
      </div>
    </section>
  )
}
