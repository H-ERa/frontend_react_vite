import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav
      className={`navbar${
        document.documentElement.classList.contains("dark") ? " dark" : ""
      }`}
    >
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" style={{ textDecoration: "none" }}>
          Victorian Whispers
        </Link>
        <div className="navbar-links">
          <Link to="/write" className="navbar-link">
            Write
          </Link>
          <Link to="/read" className="navbar-link">
            Read
          </Link>
        </div>
        <div className="navbar-toggle">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
