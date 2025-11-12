import { Navigate, useLocation } from "react-router"
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";


const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext)
  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default PrivateRoute
