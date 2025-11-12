import useDashboardData from "../../hooks/useDashboardData"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { Link } from "react-router"
import LoadingSpinner from "../../components/LoadingSpinner"
import axios from "../../api/axios"
import { toast } from "react-toastify"
import JoinedChallengeCard from "../../Challenges/JoinedChallengeCard"

const MyActivities = () => {
  const { user } = useContext(AuthContext)
  const { data, loading, refetch } = useDashboardData()

  if (loading) return <LoadingSpinner />

  const handleRemove = async (entryId) => {
    console.log("Removing entry:", entryId)
    if (!entryId) {
      toast.error("Invalid challenge entry")
      return
    }

    try {
      await axios.delete(`/user-challenges/${entryId}`)
      toast.success("Challenge removed. You can rejoin anytime.")
      refetch()
    } catch (err) {
      toast.error("Failed to remove challenge")
      console.error(err)
    }
  }


  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h2>

      {user?.uid && (
        <div className="mb-6">
          <Link
            to={`/my-activities/${user.uid}`}
            className="btn btn-outline btn-primary"
          >
            View Full Dashboard
          </Link>
        </div>
      )}

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Your Challenges</h3>
        {data.challenges?.length > 0 ? (
          data.challenges.map((entry) => (
            <JoinedChallengeCard
              key={entry._id}
              entry={entry}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p className="text-gray-500">
            You haven't joined any challenges yet.
          </p>
        )}
      </section>
    </div>
  )
}

export default MyActivities
