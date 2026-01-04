import axios from "axios"

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api", // Use env variable or fallback to local
  headers: {
    "Content-Type": "application/json",
  },
})
