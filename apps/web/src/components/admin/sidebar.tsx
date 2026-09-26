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
  );
};
