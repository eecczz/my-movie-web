// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Header.css';

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
        </Link>
      </div>
      <nav className="header__nav">
        <Link to="/">홈</Link>
        <Link to="/popular">대세 콘텐츠</Link>
        <Link to="/wishlist">나의 위시리스트</Link>
      </nav>
      <div className="header__actions">
        <FaSearch className="header__icon" />
        {isLoggedIn && (
          <div className="header__profile">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
