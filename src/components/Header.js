import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-content">
            <img src="/QSearch-logo.png" alt="QSearch Logo" className="logo-image" />
            <div className="logo-text-section">
              <span className="logo-text">QSearch</span>
              <span className="logo-subtitle">Research paper summarizer and question answering system</span>
            </div>
          </div>
        </Link>
        <div className="header-right">
          <button className="account-btn">
            <span className="account-icon">👤</span>
            <span>Account</span>
            <span className="dropdown-arrow">▼</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
