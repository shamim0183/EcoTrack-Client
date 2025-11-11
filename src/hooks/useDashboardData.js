import { useEffect, useState } from "react"
import axios from "../api/axios"

const useDashboardData = (userEmail) => {
  const [data, setData] = useState({ challenges: [], tips: [], events: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/dashboard?userEmail=${userEmail}`)
        setData(res.data)
      } catch (err) {
        console.error("Dashboard fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (userEmail) fetchData()
  }, [userEmail])

  return { data, loading }
}

export default useDashboardData
