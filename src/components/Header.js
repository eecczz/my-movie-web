import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/my-movie-web/signin'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <div className="header">
      <div className="header__logo">
        <a href="/my-movie-web">
          <img src="/path-to-your-logo.png" alt="Logo" />
        </a>
      </div>
      <div className="header__nav">
        <a href="/my-movie-web/">홈</a>
        <a href="/my-movie-web/popular">대세 콘텐츠</a>
        <a href="/my-movie-web/wishlist">내가 찜한 리스트</a>
      </div>
      <div className="header__actions">
        {authToken && (
          <div className="header__user">
            <span className="header__email">{authToken}</span>
            <button className="logout-button" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
        <FaSearch className="header__icon" />
      </div>
    </div>
  );
}

export default Header;
