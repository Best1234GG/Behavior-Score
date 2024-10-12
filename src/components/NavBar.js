// src/components/NavBar.js
import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">Behavior Score</div>
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </div>
        <ul className={`nav-links ${isActive ? 'active' : ''}`}>
          <li>
            <a href="/">หน้าหลัก</a>
          </li>
          <li>
            <a href="/statistics">ดูสถิติ</a>
          </li>
          <li>
            <a href="/admin">Admin</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
