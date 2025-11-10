import { useEffect, useState } from "react"
import axios from "axios"
import TipCard from "../components/TipCard"

const Tips = () => {
  const [tips, setTips] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tips")
      .then((res) => setTips(res.data))
      .catch((err) => console.error("Failed to fetch tips:", err))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Sustainability Tips</h2>
      <div className="grid gap-6">
        {tips.map((tip) => (
          <TipCard key={tip._id} tip={tip} />
        ))}
      </div>
    </div>
  )
}

export default Tips
