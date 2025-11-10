import { Navigate, useLocation } from "react-router"
import { use } from "react";
import { AuthContext } from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext)
  const location = useLocation()

  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default PrivateRoute
