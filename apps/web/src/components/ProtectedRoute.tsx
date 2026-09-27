import { Navigate, Outlet } from "react-router-dom";
import { hasToken } from "../services/api";

function ProtectedRoute() {
  // Requires a real JWT. The previous check also accepted a bare
  // `isAuthenticated` localStorage flag, which anyone could set by hand.
  if (!hasToken()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
