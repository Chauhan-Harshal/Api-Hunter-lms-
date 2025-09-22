
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const { user, role: userRole } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/AdminLogin" replace />;

  if (role && userRole !== role) {
    if (userRole === "user") return <Navigate to="/user/overview" replace />;
    if (userRole === "admin") return <Navigate to="/overview" replace />;
    return <Navigate to="/AdminLogin" replace />;
  }

  return children;
}