import { Link } from "react-router"
import { useEffect, useState } from "react"
import { FaLeaf, FaRecycle, FaChartLine } from "react-icons/fa"
import heroImg from "../../assets/hero-track.avif"; // Replace with actual image
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"


export default function Home() {
  const [featuredChallenges, setFeaturedChallenges] = useState([])
  const [stats, setStats] = useState({})
  const [activeChallenges, setActiveChallenges] = useState([])
  const [recentTips, setRecentTips] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  // Simulated fetch (replace with actual API calls)
  useEffect(() => {
    // Fetch featured challenges
    setFeaturedChallenges([
      { id: 1, title: "Plastic-Free Week", image: heroImg },
      { id: 2, title: "Bike to Work", image: heroImg },
    ])

    // Fetch stats
    setStats({
      co2Saved: 12850,
      plasticReduced: 3420,
      energySaved: 8900,
    })

    // Fetch active challenges
    setActiveChallenges([
      {
        id: 1,
        title: "Zero Waste",
        category: "Waste",
        metric: "120 participants",
        image: heroImg,
      },
      {
        id: 2,
        title: "Green Commute",
        category: "Transport",
        metric: "85 participants",
        image: heroImg,
      },
      // Add more...
    ])

    // Fetch recent tips
    setRecentTips([
      {
        id: 1,
        title: "Use cloth bags",
        authorName: "Ayesha",
        upvotes: 12,
        createdAt: "2h ago",
      },
      {
        id: 2,
        title: "Switch to LED",
        authorName: "Rafi",
        upvotes: 8,
        createdAt: "5h ago",
      },
      // Add more...
    ])

    // Fetch upcoming events
    setUpcomingEvents([
      {
        id: 1,
        title: "Tree Planting Drive",
        date: "Nov 15",
        location: "Dhaka",
        desc: "Join us to plant 500 trees.",
      },
      {
        id: 2,
        title: "Eco Fair",
        date: "Nov 20",
        location: "Chattogram",
        desc: "Explore green products and ideas.",
      },
      // Add more...
    ])
  }, [])

  return (
    <div className="bg-base-100">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto  py-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="rounded-lg shadow-lg"
        >
          {featuredChallenges.map((challenge) => (
            <SwiperSlide key={challenge.id}>
              <div className="relative w-full h-[300px] md:h-[400px]">
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4 bg-base-200 bg-opacity-80 p-4 rounded">
                  <h2 className="text-xl font-bold">{challenge.title}</h2>
                  <Link
                    to={`/challenges/${challenge.id}`}
                    className="btn btn-primary mt-2"
                  >
                    View Challenge
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Live Statistics */}
      <section className="bg-base-200 py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
          <div className=" flex justify-center flex-col items-center">
            <FaLeaf className="text-3xl text-success mb-2" />
            <h3 className="text-xl font-bold">{stats.co2Saved} kg</h3>
            <p>CO₂ Saved</p>
          </div>
          <div className=" flex justify-center flex-col items-center">
            <FaRecycle className="text-3xl text-info mb-2" />
            <h3 className="text-xl font-bold">{stats.plasticReduced} kg</h3>
            <p>Plastic Reduced</p>
          </div>
          <div className=" flex justify-center flex-col items-center">
            <FaChartLine className="text-3xl text-warning mb-2" />
            <h3 className="text-xl font-bold">{stats.energySaved} kWh</h3>
            <p>Energy Saved</p>
          </div>
        </div>
      </section>

      {/* Active Challenges */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Active Challenges</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {activeChallenges.map((ch) => (
            <div key={ch.id} className="card bg-base-200 shadow">
              <figure>
                <img
                  src={ch.image}
                  alt={ch.title}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{ch.title}</h3>
                <p className="text-sm text-base-content">
                  {ch.category} • {ch.metric}
                </p>
                <Link
                  to={`/challenges/${ch.id}`}
                  className="btn btn-sm btn-primary mt-2"
                >
                  Join
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
          {recentTips.map((tip) => (
            <li key={tip.id} className="bg-base-200 p-4 rounded shadow">
              <h3 className="font-semibold">{tip.title}</h3>
              <p className="text-sm text-base-content">
                By {tip.authorName} • {tip.upvotes} upvotes • {tip.createdAt}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-base-200 p-6 rounded shadow">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-sm text-base-content">
                {event.date} • {event.location}
              </p>
              <p className="mt-2">{event.desc}</p>
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
