import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowUp } from 'react-icons/fa';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false); // 스크롤 상태
  const [showScrollToTop, setShowScrollToTop] = useState(false); // 맨위로 버튼 상태
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
        setShowScrollToTop(true); // 스크롤이 50px 이상이면 버튼 표시
      } else {
        setScrolled(false);
        setShowScrollToTop(false); // 스크롤이 적으면 버튼 숨김
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    navigate('/signin');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 스크롤
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__logo">
          <a>
            <span style={{ color: '#7b42f6', fontWeight: 'bold', fontSize: '24px' }} onClick={() => {
              navigate('/');
            }}>SEANEMA</span>
          </a>
        </div>
        <nav className="header__nav">
          <span
            className="nav-link"
            onClick={() => {
              navigate('/');
            }}
          >
            홈
          </span>
          <span
            className="nav-link"
            onClick={() => {
              navigate('/popular');
            }}
          >
            인기 영화
          </span>
          <span
            className="nav-link"
            onClick={() => {
              navigate('/wishlist');
            }}
          >
            내가 찜한 리스트
          </span>
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
      {showScrollToTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default Header;
