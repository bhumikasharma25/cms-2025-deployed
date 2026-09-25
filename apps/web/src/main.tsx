import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "@repo/ui";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";
import "./styles/public.css";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <div className="placeholder">
                <h1>Admin Panel</h1>
                <p>Admin pages are coming in the next sprint.</p>
              </div>
            </AdminLayout>
          }
        />
        <Route path="/blogs" element={<Placeholder title="All Blogs" />} />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/contact" element={<Placeholder title="Contact" />} />
        <Route
          path="/blog/:slug"
          element={<Placeholder title="Blog Details" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
