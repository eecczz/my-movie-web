import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const authToken = localStorage.getItem('authToken');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); // 검색창 초기화
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="header__logo">
        <a href="/my-movie-web">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
          />
        </a>
      </div>
      <nav className="header__nav">
        <a href="/my-movie-web/">홈</a>
        <a href="/my-movie-web/popular">대세 콘텐츠</a>
        <a href="/my-movie-web/wishlist">내가 찜한 리스트</a>
      </nav>
      <div className="header__search">
          <input
            type="text"
            value={searchQuery}
            placeholder="영화 제목 검색"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      <div className="header__actions">
        <div className="header__user">
          <span>{authToken}</span>
          <button onClick={handleLogout} className="logout-button">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
