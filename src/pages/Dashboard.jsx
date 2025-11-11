import { use, useEffect, useState } from "react"
import axios from "../api/axios"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = use(AuthContext)
  const [data, setData] = useState({ challenges: [], tips: [], events: [] })

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/dashboard", {
          params: { userEmail: user?.email },
        })
        setData(res.data)
      } catch (err) {
        toast.error("Failed to load dashboard")
        console.error(err)
      }
    }

    if (user?.email) {
      fetchDashboard()
    }
  }, [user])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Your EcoTrack Dashboard</h2>

      {/* Challenges */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Joined Challenges</h3>
        {data.challenges.length === 0 ? (
          <p>No challenges joined yet.</p>
        ) : (
          <div className="grid gap-6">
            {data.challenges.map((entry) => (
              <div key={entry._id} className="card bg-base-100 shadow-md p-6">
                <h4 className="text-lg font-bold">{entry.challenge.title}</h4>
                <p className="text-sm text-gray-500">
                  {entry.challenge.category}
                </p>
                <p>{entry.challenge.description}</p>
                <p>
                  Status: <strong>{entry.status}</strong>
                </p>
                <progress
                  className="progress progress-success w-full"
                  value={entry.progress}
                  max="100"
                ></progress>
                <p className="text-xs text-gray-400">
                  Joined: {new Date(entry.joinDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tips */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Liked Tips</h3>
        {data.tips.length === 0 ? (
          <p>No tips liked yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {data.tips.map((tip) => (
              <li key={tip._id}>{tip.content}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Events */}
      <section>
        <h3 className="text-xl font-semibold mb-4">RSVP’d Events</h3>
        {data.events.length === 0 ? (
          <p>No events RSVP’d yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {data.events.map((event) => (
              <li key={event._id}>
                {event.title} — {new Date(event.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
