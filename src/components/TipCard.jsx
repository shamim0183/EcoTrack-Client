export default function TipCard({ tip }) {
  return (
    <div className="card bg-base-100 shadow-md p-6">
      <h4 className="text-lg font-bold">{tip.title}</h4>
      <p>{tip.content}</p>
      <p className="text-sm text-gray-500 mt-2">Category: {tip.category}</p>
      <p className="text-xs text-gray-400">
        Posted: {new Date(tip.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
