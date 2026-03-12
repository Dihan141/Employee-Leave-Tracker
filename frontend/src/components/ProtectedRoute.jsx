import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap protected pages
 * allowedRoles: optional array, e.g. ["admin"]
 */
// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // eslint-disable-next-line react/prop-types
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // redirect unauthorized roles
  }

  return children;
}
