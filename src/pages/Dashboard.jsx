import { useContext, useEffect, useState } from "react"
import axios from "../api/axios"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext"
import SkeletonCard from "../components/SkeletonCard"

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ challenges: [], tips: [], events: [] })

  useEffect(() => {
    if (!user) return

    const fetchDashboard = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/dashboard") // ✅ token auto-attached
        setData(res.data)
      } catch (err) {
        toast.error("Failed to load dashboard")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [user])

  const handleUpdate = async (entryId, updates) => {
    try {
      await axios.patch(`/user-challenges/update/${entryId}`, updates)

      setData((prev) => ({
        ...prev,
        challenges: prev.challenges.map((c) =>
          c.userChallengeId === entryId
            ? { ...c, ...updates, updatedAt: new Date().toISOString() }
            : c
        ),
      }))
      toast.success("Progress updated")
    } catch (err) {
      toast.error("Failed to update progress")
      console.error(err)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Your EcoTrack Dashboard</h2>

      {/* Challenges */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Joined Challenges</h3>
        {loading ? (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : data.challenges.length === 0 ? (
          <p>No challenges joined yet.</p>
        ) : (
          <div className="grid gap-6">
            {data.challenges.map((entry) => (
              <div
                key={entry.userChallengeId}
                className="card bg-base-100 shadow-md p-6"
              >
                <h4 className="text-lg font-bold">{entry.challenge.title}</h4>
                <p className="text-sm text-gray-500">
                  {entry.challenge.category}
                </p>
                <p>{entry.challenge.description}</p>

                <div className="mt-4 space-y-2">
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    className="select select-bordered w-full"
                    value={entry.status}
                    onChange={(e) =>
                      handleUpdate(entry.userChallengeId, {
                        status: e.target.value,
                      })
                    }
                  >
                    <option>Not Started</option>
                    <option>Ongoing</option>
                    <option>Finished</option>
                  </select>

                  <label className="block text-sm font-medium mt-2">
                    Progress: {entry.progress}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={entry.progress}
                    onChange={(e) =>
                      handleUpdate(entry.userChallengeId, {
                        progress: parseInt(e.target.value),
                      })
                    }
                    className="range range-success"
                  />
                </div>

                <progress
                  className="progress progress-success w-full mt-2"
                  value={entry.progress}
                  max="100"
                ></progress>

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>
                    Joined: {new Date(entry.joinDate).toLocaleDateString()}
                  </span>
                  {entry.updatedAt && (
                    <span>
                      Updated: {new Date(entry.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tips */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Liked Tips</h3>
        {loading ? (
          <div className="grid gap-6">
            {[...Array(2)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : data.tips.length === 0 ? (
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
        <h3 className="text-xl font-semibold mb-4">Events</h3>
        {loading ? (
          <div className="grid gap-6">
            {[...Array(2)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : data.events.length === 0 ? (
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
