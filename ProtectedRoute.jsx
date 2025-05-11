// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, adminOnly }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const isAdmin = localStorage.getItem("isAdmin") === "true"

  // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  // If route is admin-only and user is not admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />
  }

  // If everything is okay, show the component
  return children
}

export default ProtectedRoute