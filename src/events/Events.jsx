import { useEffect, useState } from "react"
import axios from "../api/axios"
import EventCard from "../components/EventCard"
import SkeletonCard from "../components/SkeletonCard"
import { toast } from "react-toastify"

export default function Events() {
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid gap-6">
        {loading ? (
          [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
        ) : events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => <EventCard key={event._id} event={event} />)
        )}
      </div>
    </div>
  )
}
