import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

const categories = ["IEMs", "Mobiles", "Laptops", "Audio", "Wearables"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner page-shell">
        <Link to="/" className="navbar-title" onClick={() => setMenuOpen(false)}>
          Buying Dojo
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`navbar-links ${menuOpen ? "is-open" : ""}`}>
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className={({ isActive }) =>
                `nav-link${isActive ? " is-active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {category}
            </NavLink>
          ))}

          <Link
            to="/personalizedpick/iems"
            className="personalized-btn"
            onClick={() => setMenuOpen(false)}
          >
            Personalized pick — Rs 299
          </Link>

          {user ? (
            <div className="navbar-auth">
              <span className="navbar-user" title={user.email || "Signed in"}>
                {user.displayName || user.email}
              </span>
              <button
                type="button"
                className="navbar-signout"
                onClick={handleSignOut}
              >
                <LogOut size={16} aria-hidden="true" />
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="navbar-login"
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
