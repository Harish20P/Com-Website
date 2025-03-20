import React from 'react';
import './Header.css';
import logo from '../Images/Logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <span className="company-name">RhodNet</span>
      </div>
      <nav className="nav-links">
        <a href="/" className="nav-link">Overview</a>
        <a href="/about" className="nav-link">Services</a>
        <a href="/services" className="nav-link">About Us</a>
        <a href="/Contact" className="nav-link">Contact</a>
      </nav>
    </header>
  );
};

export default Header; 