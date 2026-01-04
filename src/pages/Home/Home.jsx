import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "../../api/axios"
import CategoryBrowseGrid from "../../components/CategoryBrowseGrid"
import HowItWorksSection from "../../components/HowItWorksSection"
import SearchHeroSection from "../../components/SearchHeroSection"
import StatsSection from "../../components/StatsSection"
import TestimonialsCarousel from "../../components/TestimonialsCarousel"
import TopEcoWarriorsSection from "../../components/TopEcoWarriorsSection"
import WhyGoGreenSection from "../../components/WhyGoGreenSection"

export default function Home() {
  const [featuredChallenges, setFeaturedChallenges] = useState([])
  const [stats, setStats] = useState({})
  const [activeChallenges, setActiveChallenges] = useState([])
  const [recentTips, setRecentTips] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // Fetch challenges
      try {
        const res = await axios.get("/challenges?limit=4")
        setFeaturedChallenges(res.data)
        setActiveChallenges(res.data)
      } catch (err) {
        console.error("Challenges fetch error:", err)
      }

      // Fetch stats
      try {
        const res = await axios.get("/stats")
        setStats(res.data)
      } catch (err) {
        console.error("Stats fetch error:", err)
      }

      // Fetch tips (may fail - that's OK)
      try {
        const res = await axios.get("/tips/recent")
        setRecentTips(res.data)
      } catch (err) {
        console.error("Tips fetch error (skipping):", err)
      }

      // Fetch events
      try {
        const res = await axios.get("/events")
        setUpcomingEvents(res.data)
      } catch (err) {
        console.error("Events fetch error:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Search Hero Section */}
      <SearchHeroSection />

      {/* Category Browse Grid */}
      <CategoryBrowseGrid />

      {/* Active Challenges */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🎯 Featured Challenges
            </h2>
            <p className="text-xl text-gray-600">
              Join popular challenges and start making an impact today
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {activeChallenges.length === 0
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-gray-200 animate-pulse rounded-xl"
                  />
                ))
              : activeChallenges.slice(0, 4).map((ch) => (
                  <Link
                    key={ch._id}
                    to={`/challenges/${ch._id}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img
                        src={ch.imageUrl}
                        alt={ch.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Date/Duration Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-amber-500 text-white px-3 py-2 rounded-lg font-bold text-center min-w-[60px]">
                          <div className="text-2xl">{ch.duration}</div>
                          <div className="text-xs">DAYS</div>
                        </div>
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-eco-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {ch.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col min-h-[200px]">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[56px]">
                        {ch.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                        <span>📍 {ch.impactMetric}</span>
                      </p>
                      <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                        <span>👥 {ch.participants} participants</span>
                      </p>
                      {/* Spacer to push buttons to bottom */}
                      <div className="flex-grow"></div>
                      <div className="flex gap-2 mt-auto">
                        <span className="flex-1 text-center bg-eco-primary hover:bg-eco-dark text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-eco-primary border-2 border-eco-primary font-semibold px-8 py-3 rounded-lg transition-all"
            >
              View All Challenges →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Go Green */}
      <WhyGoGreenSection />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Top Eco-Warriors */}
      <TopEcoWarriorsSection />

      {/* Recent Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              💡 Latest Eco Tips
            </h2>
            <p className="text-xl text-gray-600">
              Learn from our community's best sustainable practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTips.length === 0
              ? [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-48 bg-gray-200 animate-pulse rounded-xl"
                  />
                ))
              : recentTips.slice(0, 6).map((tip) => (
                  <div
                    key={tip._id}
                    className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Icon */}
                    <div className="text-4xl mb-4">
                      {tip.category === "Energy" && "⚡"}
                      {tip.category === "Water" && "💧"}
                      {tip.category === "Waste" && "♻️"}
                      {tip.category === "Transport" && "🚴"}
                      {tip.category === "Food" && "🍃"}
                      {!tip.category && "💡"}
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      By {tip.authorName}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(tip.createdAt).toLocaleDateString()}
                      </span>
                      {tip.category && (
                        <span className="px-3 py-1 bg-eco-sand text-eco-primary text-xs rounded-full font-medium">
                          {tip.category}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/tips"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-eco-primary border-2 border-eco-primary font-semibold px-8 py-3 rounded-lg transition-all"
            >
              Browse All Tips →
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              📅 Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Join community events and make connections
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.length === 0
              ? [...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="h-48 bg-gray-200 animate-pulse rounded-xl"
                  />
                ))
              : upcomingEvents.slice(0, 4).map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Date Badge */}
                      <div className="bg-eco-primary text-white rounded-lg p-4 text-center min-w-[80px] h-fit">
                        <div className="text-3xl font-bold">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-sm">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                          <span>📍</span>
                          <span>{event.location}</span>
                        </p>
                        <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                          {event.description}
                        </p>
                        <button className="text-eco-primary hover:text-eco-primary-dark font-semibold text-sm">
                          Learn More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-eco-primary border-2 border-eco-primary font-semibold px-8 py-3 rounded-lg transition-all"
            >
              View All Events →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* How It Works */}
      <HowItWorksSection />
    </div>
  )
}
