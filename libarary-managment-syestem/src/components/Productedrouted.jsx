// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const { user, role: userRole } = useSelector((state) => state.auth);

//   // Not logged in → go to login
//   if (!user) return <Navigate to="/AdminLogin" replace />;

//   // Wrong role → redirect based on their role
//   if (role && userRole !== role) {
//     return <Navigate to={userRole === "admin" ? "/overview" : "/book"} replace />;
//   }

//   return children;
// }
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