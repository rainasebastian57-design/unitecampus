import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1>UnifyCampus</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">Events</a>
        <a href="#">Clubs</a>
        <a href="#">Login</a>
      </nav>
    </header>
  );
}

export default Header;
