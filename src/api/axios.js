import axios from "axios"

export default axios.create({
  baseURL: "https://eco-track-server-eight.vercel.app/api", // ✅ matches your Express server
  headers: {
    "Content-Type": "application/json",
  },
})
