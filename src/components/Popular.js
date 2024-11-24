import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMovies, URLS } from '../services/URL';
import Header from './Header';
import { FaHeart, FaArrowUp } from 'react-icons/fa'; // 좋아요 아이콘
import './Popular.css';

function Popular() {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState('infinite'); // "table" or "infinite"
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [hasMore, setHasMore] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200); // 스크롤 위치가 200px 이상일 때 버튼 표시
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (viewMode === 'infinite') {
      loadMovies();
    } else {
      loadMoviesForTable(page);
    }
  }, [page, viewMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadMovies = async () => {
    const data = await fetchMovies(URLS.popularMovies(page));
    setMovies((prevMovies) => [...prevMovies, ...data.results]);
    setHasMore(data.page < data.total_pages);
  };

  const loadMoviesForTable = async (currentPage) => {
    const data = await fetchMovies(URLS.popularMovies(currentPage));
    setMovies(data.results || []);
    setTotalPages(data.total_pages || 1); // 총 페이지 수 업데이트
  };

  const handleWishlistToggle = (movie) => {
    const isAlreadyInWishlist = wishlist.some((item) => item.id === movie.id);
    const updatedWishlist = isAlreadyInWishlist
      ? wishlist.filter((item) => item.id !== movie.id) // 제거
      : [...wishlist, movie]; // 추가

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const switchToTableView = () => {
    setViewMode('table');
    setPage(1); // 페이지를 초기화
  };

  const switchToInfiniteView = () => {
    setViewMode('infinite');
    setMovies([]); // 무한 스크롤 데이터를 초기화
    setPage(1); // 페이지를 초기화
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="popular">
      <Header />
      <h2>대세 콘텐츠</h2>
      <div className="view-toggle">
        <button onClick={switchToTableView}>Table View</button>
        <button onClick={switchToInfiniteView}>Infinite Scroll</button>
      </div>
      {viewMode === 'table' ? (
        <div className="table-view">
          {movies.map((movie, index) => (
            <div key={`${movie.id}-${index}`} className="table-movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="table-movie-poster"
              />
              <h3>{movie.title}</h3>
              <p>{movie.overview.slice(0, 100)}...</p>
              <button
                className="wishlist-button"
                onClick={() => handleWishlistToggle(movie)}
              >
                <FaHeart color={wishlist.some((item) => item.id === movie.id) ? 'gray' : 'white'} />
              </button>
            </div>
          ))}
          <div className="pagination">
            <button
              disabled={page === 1} // 첫 페이지에서는 비활성화
              onClick={handlePreviousPage}
            >
              이전
            </button>
            {[...Array(totalPages).keys()].slice(0, 5).map((pageNum) => (
              <button
                key={pageNum + 1}
                className={page === pageNum + 1 ? 'active' : ''}
                onClick={() => setPage(pageNum + 1)}
              >
                {pageNum + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages} // 마지막 페이지에서는 비활성화
              onClick={handleNextPage}
            >
              다음
            </button>
          </div>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={movies.length}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
        >
          <div className="movies">
            {movies.map((movie, index) => (
              <div key={`${movie.id}-${index}`} className="movie-item">
                <div className="movie-image-container">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="movie-info">
                    <h3>
                      {movie.title}
                      <button
                        className="wishlist-button"
                        onClick={() => handleWishlistToggle(movie)}
                      >
                        <FaHeart color={wishlist.some((item) => item.id === movie.id) ? 'gray' : 'white'} />
                      </button>
                    </h3>
                    <p>{movie.overview.slice(0, 60)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
      {showScrollToTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default Popular;
