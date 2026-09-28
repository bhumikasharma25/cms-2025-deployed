import { useNavigate } from "react-router-dom";
import { clearSession } from "../../services/api";
import { useAdmin } from "../../hooks/useAdmin";
import { IconBell, IconMenu, IconSearch } from "./icons";

interface HeaderProps {
  onMenu: () => void;
}

export const Header = ({ onMenu }: HeaderProps) => {
  const navigate = useNavigate();
  const { name: adminName, initials } = useAdmin();

  const logout = () => {
    clearSession();
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="admin-header">
      <button
        type="button"
        className="hamburger"
        aria-label="Open menu"
        onClick={onMenu}
      >
        <IconMenu size={20} />
      </button>

      <div className="header-search">
        <IconSearch size={15} />
        <input
          type="search"
          placeholder="Search..."
          aria-label="Search admin"
        />
      </div>

      <div className="header-right">
        <span className="live-badge">Platform Live</span>
        <button
          type="button"
          className="ghost-icon"
          aria-label="Notifications"
        >
          <IconBell size={18} />
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={logout}>
          Logout
        </button>
        <span className="avatar sm" title={adminName}>
          {initials}
        </span>
      </div>
    </header>
  );
};
