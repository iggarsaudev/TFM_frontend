import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import "./publicLayout.css";

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="global">
      <header className="header">
        <div className="header__logo">
          IgLu's<span className="header__logo--highlight">Shop</span>
        </div>

        <nav className={`header__nav ${menuOpen ? "header__nav--active" : ""}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink to="/" className="header__nav-link">
                Home
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink to="/products" className="header__nav-link">
                Products
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink to="/outlet" className="header__nav-link">
                Outlet
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink to="/contact" className="header__nav-link">
                Contact
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink to="/reviews" className="header__nav-link">
                Reviews
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          {isAuthenticated ? (
            <button onClick={logout} className="header__login-btn">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="header__login-btn">
              Login
            </NavLink>
          )}

          <NavLink to="/cart" className="header__cart-btn">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="cart__count hidden">0</span>
          </NavLink>
        </div>

        <button
          className={`header__toggler ${
            menuOpen ? "header__toggler--active" : ""
          }`}
          onClick={toggleMenu}
        >
          <span className="header__toggler-icon header__toggler-icon--menu material-symbols-outlined">
            menu
          </span>
          <span className="header__toggler-icon header__toggler-icon--close material-symbols-outlined">
            close
          </span>
        </button>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="header__logo">
          IgLu's<span className="header__logo--highlight">Shop</span>
        </div>
        <div className="footer__links">
          <NavLink to="/legal" className="footer__link" target="_blank">
            Legal Notice
          </NavLink>
          |
          <NavLink to="/cookies" className="footer__link" target="_blank">
            Cookies Policy
          </NavLink>
        </div>
        <p className="footer__info">
          &copy; 2025 IgLu'S Shop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
