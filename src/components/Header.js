import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowUp, FaBars } from 'react-icons/fa';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [scrolled, setScrolled] = useState(false); // 스크롤 상태
  const [showScrollToTop, setShowScrollToTop] = useState(false); // 맨 위로 버튼 표시 여부
  const [sidebarOpen, setSidebarOpen] = useState(false); // 사이드바 상태
  const [userName, setUserName] = useState('Guest'); // 사용자 이름

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // 스크롤 위치가 50px 이상인지 확인
      setShowScrollToTop(window.scrollY > 200); // 스크롤 위치가 200px 이상인지 확인
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // 사용자 정보 로드
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const userNickname = userInfo?.properties?.nickname || 'Guest';
    setUserName(userNickname);
  }, [localStorage.getItem('userInfo')]); // 로컬 저장소 변경 시 업데이트

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // 검색 쿼리를 URL로 전달
      setSearchQuery(''); // 검색 입력창 초기화
    }
  };

  const handleLogout = () => {
    // 로컬 저장소 초기화
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setUserName('Guest'); // 사용자 이름 초기화
    navigate('/signin'); // 로그인 페이지로 이동
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 맨 위로 스크롤
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // 사이드바 상태 변경
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__logo">
          <span
            style={{ color: '#6c63ff', fontWeight: 'bold', fontSize: '24px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            SEONEMA
          </span>
        </div>

        {/* 내비게이션 메뉴 */}
        <nav className="header__nav">
          <span className="nav-link" onClick={() => navigate('/')}>홈</span>
          <span className="nav-link" onClick={() => navigate('/popular')}>인기 영화</span>
          <span className="nav-link" onClick={() => navigate('/wishlist')}>내가 찜한 리스트</span>
        </nav>

        {/* 검색창 */}
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

        {/* 사용자 액션 버튼 */}
        <div className="header__actions">
          <span className="header__user">{userName}</span>
          {localStorage.getItem('authToken') ? (
            <button onClick={handleLogout} className="logout-button">로그아웃</button>
          ) : (
            <button onClick={() => navigate('/signin')} className="login-button">로그인</button>
          )}
        </div>

        {/* 사이드바 버튼 */}
        <button className="header__menu-button" onClick={toggleSidebar}>
          <FaBars />
        </button>

        {/* 사이드바 */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <span className="nav-link" onClick={() => navigate('/')}>홈</span>
          <span className="nav-link" onClick={() => navigate('/popular')}>인기 영화</span>
          <span className="nav-link" onClick={() => navigate('/wishlist')}>내가 찜한 리스트</span>
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
