import { motion } from "framer-motion"
import Marquee from "react-fast-marquee"
import { FaQuoteLeft, FaStar } from "react-icons/fa"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Eco Enthusiast",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "EcoTrack helped me reduce my carbon footprint by 40%! The challenges are fun and really make a difference.",
    co2Saved: "2.5 tons",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Sustainability Champion",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    text: "Amazing platform! I've completed 15 challenges and inspired my whole neighborhood to join.",
    co2Saved: "3.2 tons",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Green Living Advocate",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: "The community support is incredible. Every small action counts and EcoTrack makes it easy to track.",
    co2Saved: "1.8 tons",
  },
  {
    id: 4,
    name: "David Park",
    role: "Environmental Blogger",
    image: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    text: "Love how gamified it is! The leaderboards keep me motivated to do more for our planet.",
    co2Saved: "4.1 tons",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Zero Waste Warrior",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "EcoTrack transformed my lifestyle. Now I can't imagine not tracking my sustainable actions!",
    co2Saved: "2.9 tons",
  },
]

export default function TestimonialsCarousel() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 mb-12">
        {/* Section Header */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            What Our Eco-Warriors Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Join thousands of users making a real impact on the planet
          </motion.p>
        </div>
      </div>

      {/* Marquee Testimonials */}
      <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="mx-4 w-[400px]">
            <div className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow h-full">
              {/* Quote Icon */}
              <FaQuoteLeft className="text-4xl text-eco-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-amber-500" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-eco-primary font-semibold mt-1">
                    💚 {testimonial.co2Saved} CO₂ saved
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
