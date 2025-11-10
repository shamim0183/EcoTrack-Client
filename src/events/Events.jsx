import { useEffect, useState } from "react"
import axios from "axios"
import EventCard from "../components/EventCard"

const Events = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Failed to fetch events:", err))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  )
}

export default Events
