import { IconBell, IconMenu, IconSearch } from "./icons";

interface HeaderProps {
  onMenu: () => void;
}

export const Header = ({ onMenu }: HeaderProps) => {
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
        <button type="button" className="ghost-icon" aria-label="Notifications">
          <IconBell size={18} />
        </button>
        <span className="avatar sm" title="Arpita Awasthi">
          AA
        </span>
      </div>
    </header>
  );
};
