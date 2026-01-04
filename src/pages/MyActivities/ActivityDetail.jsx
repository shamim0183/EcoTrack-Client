import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import axios from "../../api/axios"
import SkeletonCard from "../../components/SkeletonCard"
import { AuthContext } from "../../context/AuthContext"

export default function ActivityDetail() {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ challenges: [], tips: [], events: [] })

  useEffect(() => {
    if (!user || !id) return

    // 🔒 Validate route ID matches logged-in user
    if (id !== user.uid) {
      toast.error("Access denied: This activity does not belong to you.")
      return
    }

    const fetchActivity = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/dashboard")
        setData(res.data)
      } catch (err) {
        toast.error("Failed to load activity")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [user, id])

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
    <div className="bg-white rounded shadow p-6">
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
                  <label className="block text-sm font-semibold text-gray-700">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg shadow-sm 
                    transition-all duration-200 ease-in-out
                    hover:border-eco-primary hover:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-eco-primary
                    cursor-pointer text-gray-700 font-medium
                    appearance-none bg-no-repeat bg-right pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234CAF50'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: "1.5em 1.5em",
                      backgroundPosition: "right 0.5rem center",
                    }}
                    value={entry.status}
                    onChange={(e) =>
                      handleUpdate(entry.userChallengeId, {
                        status: e.target.value,
                      })
                    }
                  >
                    <option
                      value="Not Started"
                      className="py-2 px-4 hover:bg-gray-100"
                    >
                      🔵 Not Started
                    </option>
                    <option
                      value="Ongoing"
                      className="py-2 px-4 hover:bg-blue-50"
                    >
                      🟢 Ongoing
                    </option>
                    <option
                      value="Finished"
                      className="py-2 px-4 hover:bg-green-50"
                    >
                      ✅ Finished
                    </option>
                  </select>

                  {/* Progress Section */}
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-gray-700">
                        Challenge Progress
                      </label>
                      <span className="text-2xl font-bold text-eco-primary">
                        {entry.progress}%
                      </span>
                    </div>

                    {/* Custom Range Slider */}
                    <div className="relative">
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
                        className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer
                        transition-all duration-300 ease-in-out
                        hover:bg-gray-300
                        focus:outline-none focus:ring-2 focus:ring-eco-primary focus:ring-offset-2"
                        style={{
                          background: `linear-gradient(to right, 
                            #10b981 0%, 
                            #10b981 ${entry.progress}%, 
                            #e5e7eb ${entry.progress}%, 
                            #e5e7eb 100%)`,
                        }}
                      />
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out
                        bg-gradient-to-r from-eco-primary via-green-500 to-eco-success
                        shadow-lg relative overflow-hidden"
                        style={{ width: `${entry.progress}%` }}
                      >
                        {/* Animated shine effect */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                        animate-shimmer"
                          style={{
                            backgroundSize: "200% 100%",
                            animation: "shimmer 2s infinite",
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Progress Milestones */}
                    <div className="flex justify-between text-xs text-gray-500 px-1">
                      <span
                        className={
                          entry.progress >= 0
                            ? "text-eco-primary font-semibold"
                            : ""
                        }
                      >
                        0%
                      </span>
                      <span
                        className={
                          entry.progress >= 25
                            ? "text-eco-primary font-semibold"
                            : ""
                        }
                      >
                        25%
                      </span>
                      <span
                        className={
                          entry.progress >= 50
                            ? "text-eco-primary font-semibold"
                            : ""
                        }
                      >
                        50%
                      </span>
                      <span
                        className={
                          entry.progress >= 75
                            ? "text-eco-primary font-semibold"
                            : ""
                        }
                      >
                        75%
                      </span>
                      <span
                        className={
                          entry.progress >= 100
                            ? "text-eco-success font-bold"
                            : ""
                        }
                      >
                        100%
                      </span>
                    </div>
                  </div>
                </div>
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
    </div>
  )
}
