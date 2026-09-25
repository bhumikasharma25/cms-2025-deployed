import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages — accessible to everyone, no login required */}
        <Route path="/" element={<Home />} />
        <Route
          path="/blogs"
          element={<Placeholder title="All Blogs" />}
        />
        <Route
          path="/about"
          element={<Placeholder title="About" />}
        />
        <Route
          path="/contact"
          element={<Placeholder title="Contact" />}
        />
        <Route
          path="/blog/:slug"
          element={<Placeholder title="Blog Details" />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* Protected Admin Pages */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
          />
        </Route>

        {/* Unknown URL — send to public homepage */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
