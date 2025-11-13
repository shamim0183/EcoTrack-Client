import { useEffect, useState } from "react"
import { FaChartLine, FaLeaf, FaRecycle } from "react-icons/fa"
import { Link } from "react-router"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import axios from "../../api/axios"
import heroImg from "../../assets/hero-track.avif"
import StatCard from "../../components/StatCard"

export default function Home() {
  const [featuredChallenges, setFeaturedChallenges] = useState([])
  const [stats, setStats] = useState({})
  const [activeChallenges, setActiveChallenges] = useState([])
  const [recentTips, setRecentTips] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, statsRes, activeRes, tipsRes, eventsRes] =
          
          
          await Promise.all([
            axios.get("/challenges"),
            axios.get("/stats"),
            axios.get("/challenges"),
            axios.get("/tips/recent"),
            axios.get("/events"),
          ])
        setFeaturedChallenges(featuredRes.data)

        setStats(statsRes.data)
        console.log(statsRes)
        
        setActiveChallenges(activeRes.data)
        setRecentTips(tipsRes.data)

        setUpcomingEvents(eventsRes.data)
      } catch (err) {
        console.error("Home page fetch error:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="bg-base-100">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto py-12">
        {featuredChallenges.length === 0 ? (
          <div className="h-[300px] md:h-[400px] bg-base-200 animate-pulse rounded-lg" />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
            className="rounded-lg shadow-lg"
          >
            {featuredChallenges.map((challenge) => (
              <SwiperSlide key={challenge._id}>
                <div className="relative w-full h-[300px] md:h-[400px]">
                  <img
                    src={challenge.imageUrl || heroImg}
                    alt={challenge.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-base-200 bg-opacity-80 p-4 rounded">
                    <h2 className="text-xl font-bold">{challenge.title}</h2>
                    <Link
                      to={`/challenges/${challenge._id}`}
                      className="btn btn-primary mt-2"
                    >
                      View Challenge
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* Live Statistics */}
      <section className="bg-base-200 py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
          {Object.keys(stats).length === 0 ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-base-300 animate-pulse rounded" />
            ))
          ) : (
            <>
              <StatCard
                icon={<FaLeaf />}
                value={stats.co2Saved}
                label="CO₂ Saved"
                unit="kg"
              />
              <StatCard
                icon={<FaRecycle />}
                value={stats.plasticReduced}
                label="Plastic Reduced"
                unit="kg"
              />
              <StatCard
                icon={<FaChartLine />}
                value={stats.energySaved}
                label="Energy Saved"
                unit="kWh"
              />
            </>
          )}
        </div>
      </section>

      {/* Active Challenges */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Active Challenges</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {activeChallenges.length === 0
            ? [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-base-200 animate-pulse rounded"
                />
              ))
            : activeChallenges.map((ch) => (
                <div key={ch._id} className="card bg-base-200 shadow">
                  <figure>
                    <img
                      src={ch.imageUrl || heroImg}
                      alt={ch.title}
                      className="h-40 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{ch.title}</h3>
                    <p className="text-sm text-base-content">
                      {ch.category} • {ch.participants} participants
                    </p>
                    <Link
                      to={`/challenges/${ch._id}`}
                      className="btn btn-sm btn-primary mt-2"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* Recent Tips */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Recent Tips</h2>
        <ul className="space-y-4">
          {recentTips.length === 0
            ? [...Array(3)].map((_, i) => (
                <li
                  key={i}
                  className="h-20 bg-base-200 animate-pulse rounded"
                />
              ))
            : recentTips.map((tip) => (
                <li key={tip._id} className="bg-base-200 p-4 rounded shadow">
                  <h3 className="font-semibold">{tip.title}</h3>
                  <p className="text-sm text-base-content">
                    By {tip.authorName} • {tip.upvotes} upvotes •{" "}
                    {new Date(tip.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
        </ul>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingEvents.length === 0
            ? [...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-base-200 animate-pulse rounded"
                />
              ))
            : upcomingEvents.map((event) => (
                <div key={event._id} className="bg-base-200 p-6 rounded shadow">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-sm text-base-content">
                    {new Date(event.date).toLocaleDateString()} •{" "}
                    {event.location}
                  </p>
                  <p className="mt-2">{event.description}</p>
                </div>
              ))}
        </div>
      </section>

      {/* Static: Why Go Green */}
      <section className="bg-base-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Why Go Green?</h2>
          <ul className="list-disc list-inside space-y-2 text-base-content">
            <li>Reduce your carbon footprint</li>
            <li>Protect natural resources</li>
            <li>Improve community health</li>
            <li>Save money through sustainable habits</li>
            <li>Inspire others to take action</li>
          </ul>
        </div>
      </section>

      {/* Static: How It Works */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
          <div className="bg-base-200 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">1. Join a Challenge</h3>
            <p>Pick a challenge that fits your lifestyle and goals.</p>
          </div>
          <div className="bg-base-200 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">2. Track Progress</h3>
            <p>Log your eco-friendly actions and see your impact grow.</p>
          </div>
          <div className="bg-base-200 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">3. Share Tips</h3>
            <p>Help others by sharing your best sustainability hacks.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
