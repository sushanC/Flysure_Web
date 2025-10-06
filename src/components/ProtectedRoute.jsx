import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Role restriction (e.g., admin only)
  if (role && userRole !== role) {
    return (
      <p className="text-red-600 text-center mt-10 text-xl">
        Access denied ❌
      </p>
    );
  }

  return children;
}
