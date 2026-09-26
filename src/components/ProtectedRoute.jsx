import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const localLogin = localStorage.getItem("rosalina_auth");
  const sessionLogin = sessionStorage.getItem("rosalina_auth");

  const isAuthenticated =
    localLogin === "true" || sessionLogin === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}