
import useDashboardData from "../../hooks/useDashboardData"
import ChallengeCard from "../../components/ChallengeCard"
import TipCard from "../../components/TipCard"
import EventCard from "../../components/EventCard"
import { AuthContext } from "../../context/AuthContext";
import { use } from "react";

const MyActivities = () => {
  const { user } = use(AuthContext)
  const { data, loading } = useDashboardData(user?.email)

  if (loading) return <p>Loading your activities...</p>

  return (
    <div>
      <h2>Welcome, {user?.displayName}</h2>

      <section>
        <h3>Your Challenges</h3>
        {data.challenges.map((c) => (
          <ChallengeCard key={c._id} challenge={c} />
        ))}
      </section>

      <section>
        <h3>Your Liked Tips</h3>
        {data.tips.map((t) => (
          <TipCard key={t._id} tip={t} />
        ))}
      </section>

      <section>
        <h3>Your Events</h3>
        {data.events.map((e) => (
          <EventCard key={e._id} event={e} />
        ))}
      </section>
    </div>
  )
}

export default MyActivities
