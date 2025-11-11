import { useEffect, useState } from "react"
import axios from "../api/axios"
import TipCard from "../components/TipCard"
import SkeletonCard from "../components/SkeletonCard"
import { toast } from "react-toastify"

export default function Tips() {
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/tips")
        setTips(res.data)
      } catch (err) {
        toast.error("Failed to load tips")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTips()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Eco Tips</h2>

      <div className="grid gap-6">
        {loading ? (
          [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
        ) : tips.length === 0 ? (
          <p>No tips available.</p>
        ) : (
          tips.map((tip) => <TipCard key={tip._id} tip={tip} />)
        )}
      </div>
    </div>
  )
}
