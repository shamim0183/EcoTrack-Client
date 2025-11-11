import axios from "axios"

export default axios.create({
  baseURL: "http://localhost:3000/api", // ✅ matches your Express server
  headers: {
    "Content-Type": "application/json",
  },
})
