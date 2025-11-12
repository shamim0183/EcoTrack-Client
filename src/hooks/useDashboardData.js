import { useEffect, useState } from "react"
import axios from "../api/axios"

const useDashboardData = () => {
  const [data, setData] = useState({ challenges: [], tips: [], events: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/dashboard") 
        setData(res.data)
      } catch (err) {
        console.error("Dashboard fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading }
}

export default useDashboardData
