import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

export default function Events() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/events")
        setEvents(res.data)
      } catch (err) {
        toast.error("Failed to load events")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleRegister = async (eventId) => {
    if (!user?.email) {
      navigate("/login")
      return
    }
    try {
      await axios.post("/events/register", { eventId, userEmail: user.email })
      toast.success("Registered for event!")
    } catch (err) {
      toast.error("Failed to register")
      console.error(err)
    }
  }

  const handleEdit = (eventId) => {
    navigate(`/event/edit/${eventId}`)
  }

  const handleDelete = async (eventId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (!result.isConfirmed) return

    try {
      await axios.delete(`/events/${eventId}`)
      toast.success("Event deleted")
      setEvents((prev) => prev.filter((e) => e._id !== eventId))
    } catch (err) {
      toast.error("Failed to delete event")
      console.error(err)
    }
  }

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-sand via-white to-eco-cream">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-eco-primary-dark to-eco-primary text-white py-20">
        <div className="max-w-screen-2xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            📅 Upcoming Green Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-eco-cream max-w-2xl mx-auto"
          >
            Join our community events and connect with fellow eco-warriors
          </motion.p>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {loading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-eco"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-2xl text-gray-500 mb-2">No upcoming events</p>
            <p className="text-gray-400">Check back soon for new events!</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-eco-accent transform md:-translate-x-1/2" />

            {events.map((event, index) => (
              <motion.div
                key={event._id}
                variants={itemVariants}
                className={`relative mb-12 ${
                  index % 2 === 0 ? "md:text-right" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-eco-primary rounded-full border-4 border-white shadow-eco z-10" />

                <div
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-white rounded-eco p-6 shadow-eco hover:shadow-eco-lg transition-all cursor-pointer"
                  >
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 bg-eco-primary text-white px-4 py-2 rounded-full mb-4 font-semibold text-sm">
                      <span>📅</span>
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-eco-primary-dark mb-3">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-eco-primary">
                        <span>📍</span>
                        <span className="font-medium">{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center gap-2 text-eco-primary">
                          <span>👥</span>
                          <span className="font-medium">
                            {event.attendees} attending
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Conditional Buttons */}
                    {user?.email === event.organizer ? (
                      // Admin Edit/Delete
                      <div className="mt-6 flex gap-2">
                        <button
                          onClick={() => handleEdit(event._id)}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    ) : (
                      // Register Button for users
                      <button
                        onClick={() => handleRegister(event._id)}
                        className="mt-6 btn-eco w-full md:w-auto"
                      >
                        Register Now →
                      </button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
