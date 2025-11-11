export default function EventCard({ event }) {
  return (
    <div className="card bg-base-100 shadow-md p-6">
      <h4 className="text-lg font-bold">{event.title}</h4>
      <p>{event.description}</p>
      <p className="text-sm text-gray-500 mt-2">Location: {event.location}</p>
      <p className="text-sm text-gray-500">
        Date: {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-xs text-gray-400">Organizer: {event.organizer}</p>
    </div>
  )
}
