export default function StatCard({ icon, value = 0, label, unit }) {
  return (
    <div className="flex flex-col items-center justify-center bg-base-100 p-4 rounded shadow">
      <div className="text-3xl mb-2 text-primary">{icon}</div>
      <h3 className="text-xl font-bold">
        {value} {unit}
      </h3>
      <p className="text-base-content">{label}</p>
    </div>
  )
}
