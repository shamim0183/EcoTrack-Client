import useDashboardData from "../../hooks/useDashboardData"
import ChallengeCard from "../../components/ChallengeCard"
import TipCard from "../../components/TipCard"
import EventCard from "../../components/EventCard"
import { AuthContext } from "../../context/AuthContext"
import { use } from "react"
import { Link } from "react-router"

const MyActivities = () => {
  const { user } = use(AuthContext)
  const { data, loading } = useDashboardData()

  if (loading) return <p>Loading your activities...</p>

  return (
    <div className=" bg-white rounded shadow p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h2>

      {/* 🔗 Link to full dashboard */}
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
        {data.challenges.map((c, index) => (
          <ChallengeCard key={index} challenge={c} />
        ))}
      </section>

      {/* <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Your Liked Tips</h3>
        {data.tips.map((t) => (
          <TipCard key={t._id} tip={t} />
        ))}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Your Events</h3>
        {data.events.map((e) => (
          <EventCard key={e._id} event={e} />
        ))}
      </section> */}
    </div>
  )
}

export default MyActivities
