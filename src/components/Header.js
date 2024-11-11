// Header.js
import React from 'react';
import './Header.css';
import { FaSearch, FaBell } from 'react-icons/fa';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
      </div>
      <nav className="header__nav">
        <a href="#home">홈</a>
        <a href="#trending">대세 콘텐츠</a>
        <a href="#wishlist">나의 위시리스트</a>
      </nav>
      <div className="header__actions">
        <FaSearch className="header__icon" />
        <FaBell className="header__icon" />
        <div className="header__profile">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" />
        </div>
      </div>
    </header>
  );
}

export default Header;
