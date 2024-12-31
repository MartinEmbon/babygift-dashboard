import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/navbar.css";

function Navbar({ onLogout, onNavigate }) {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <nav className="navbar">
      <h2 className="navbar-brand">Baby Wishlist</h2>
      <ul className="navbar-links">
        <li onClick={() => onNavigate("wishlist")}>Wishlist</li>
        <li onClick={() => onNavigate("moneyRaised")}>Money Raised</li>
        <li onClick={() => onNavigate("profile")}>Profile</li>
        <li onClick={onLogout}>Logout</li>
      </ul>
    </nav>
  );
}

export default Navbar;
