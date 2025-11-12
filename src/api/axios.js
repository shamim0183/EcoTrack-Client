import axios from "axios"

export default axios.create({
  baseURL: "https://eco-track-server-eight.vercel.app/api", 
  headers: {
    "Content-Type": "application/json",
  },
})
