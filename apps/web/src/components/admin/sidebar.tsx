<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import {
  IconBook,
  IconClose,
  IconDashboard,
  IconFolder,
  IconGear,
  IconMedia,
  IconPosts,
  IconTag,
} from "./icons";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", Icon: IconDashboard },
  { to: "/admin/blogs", label: "Posts", Icon: IconPosts },
  { to: "/admin/media", label: "Media", Icon: IconMedia },
  { to: "/admin/categories", label: "Categories", Icon: IconFolder },
  { to: "/admin/tags", label: "Tags", Icon: IconTag },
  { to: "/admin/settings", label: "Settings", Icon: IconGear },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <>
      {open && (
        <button
          type="button"
          className="admin-overlay"
          aria-label="Close menu"
          onClick={onClose}
        />
      )}

      <aside className={`admin-sidebar${open ? " open" : ""}`}>
        <div className="side-brand">
          <span className="side-mark">
            <IconBook size={15} />
          </span>
          <span className="side-name">Blogify</span>
          <button
            type="button"
            className="ghost-icon side-close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <IconClose size={17} />
          </button>
        </div>

        <nav className="side-nav" aria-label="Admin navigation">
          {items.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `side-link${isActive ? " active" : ""}`
              }
              onClick={onClose}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="side-spacer" />

        <div className="side-user">
          <span className="avatar">AA</span>
          <div className="side-user-meta">
            <div className="side-user-name">Arpita</div>
            <div className="side-user-role">Super Admin</div>
          </div>
        </div>
      </aside>
    </>
=======
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <nav style={{
      width: "250px",
      background: "#1e293b",
      color: "white",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      borderRight: "1px solid #334155"
    }}>
      <div style={{
        fontSize: "20px", 
        fontWeight: "bold", 
        marginBottom: "24px",
        paddingBottom: "12px",
        borderBottom: "1px solid #334155"
      }}>Blog CMS Admin</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <Link to="/admin/dashboard" style={{
            color: "white",
            textDecoration: "none",
            fontSize: "15px",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "block",
            marginBottom: "2px",
            fontWeight: 500
          }}>Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/blogs" style={{
            color: "#cbd5e1",
            textDecoration: "none",
            fontSize: "15px",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "block",
            marginBottom: "2px"
          }}>Blogs</Link>
        </li>
        <li>
          <Link to="/admin/blogs/create" style={{
            color: "#cbd5e1",
            textDecoration: "none",
            fontSize: "15px",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "block",
            marginBottom: "2px"
          }}>Create Blog</Link>
        </li>
        <li>
          <Link to="/admin/categories" style={{
            color: "#cbd5e1",
            textDecoration: "none",
            fontSize: "15px",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "block",
            marginBottom: "2px"
          }}>Categories</Link>
        </li>
        <li>
          <Link to="/admin/login" style={{
            color: "#3b82f6",
            textDecoration: "none",
            fontSize: "15px",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "block",
            marginBottom: "2px",
            fontWeight: 500,
            background: "transparent"
          }}>Login</Link>
        </li>
      </ul>
    </nav>
>>>>>>> c69ad02 (changes in Pages)
  );
};
