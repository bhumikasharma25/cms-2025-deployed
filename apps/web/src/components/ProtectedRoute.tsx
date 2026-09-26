import { Navigate, Outlet } from "react-router-dom";
import { AUTH_KEY, TOKEN_KEY } from "../services/api";

function ProtectedRoute() {
  // Accept either a real JWT from the backend or the demo flag.
  const isAuthenticated =
    localStorage.getItem(TOKEN_KEY) !== null ||
    localStorage.getItem(AUTH_KEY) === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
