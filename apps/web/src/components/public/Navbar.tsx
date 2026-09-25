import { useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { goToSection } from "../../utils/navigation";

interface NavbarProps {
  query?: string;
  onQueryChange?: (value: string) => void;
}

export default function Navbar({ query, onQueryChange }: NavbarProps) {
  const [internalQuery, setInternalQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const value = query ?? internalQuery;

  const update = (v: string) => {
    setInternalQuery(v);
    onQueryChange?.(v);
  };

  const clearSearch = () => {
    update("");
    setSearchOpen(false);
  };

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  const onSection =
    (id: string) => (e: MouseEvent) => goToSection(e, id, pathname, navigate);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Logo />

        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
          <Link to="/blogs" className={isActive("/blogs") ? "active" : ""}>
            Blog
          </Link>
          <a href="/#categories" onClick={onSection("categories")}>
            Categories
          </a>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>
            About
          </Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
            Contact
          </Link>
        </nav>

        <div className="nav-actions">
          {searchOpen ? (
            <div className="nav-search">
              <input
                autoFocus
                value={value}
                onChange={(e) => update(e.target.value)}
                placeholder="Search blogs..."
                aria-label="Search blogs"
              />
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Close search"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className="icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          )}

          <button className="btn-subscribe" onClick={onSection("newsletter")}>
            Subscribe
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link
            to="/"
            className={isActive("/") ? "active" : ""}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className={isActive("/blogs") ? "active" : ""}
            onClick={closeMenu}
          >
            Blog
          </Link>
          <a
            href="/#categories"
            onClick={(e) => {
              onSection("categories")(e);
              closeMenu();
            }}
          >
            Categories
          </a>
          <Link
            to="/about"
            className={isActive("/about") ? "active" : ""}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={isActive("/contact") ? "active" : ""}
            onClick={closeMenu}
          >
            Contact
          </Link>

          <div className="mobile-search">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={value}
              onChange={(e) => update(e.target.value)}
              placeholder="Search blogs..."
              aria-label="Search blogs"
            />
          </div>

          <button
            className="btn-subscribe"
            onClick={(e) => {
              onSection("newsletter")(e);
              closeMenu();
            }}
          >
            Subscribe
          </button>
        </div>
      )}
    </header>
  );
}
