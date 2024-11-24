import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './Header';
import { FaArrowUp } from 'react-icons/fa';
import './Wishlist.css';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
    setVisibleMovies(storedWishlist.slice(0, itemsPerPage));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchMoreMovies = () => {
    const nextPage = page + 1;
    const nextMovies = wishlist.slice(0, nextPage * itemsPerPage);
    setVisibleMovies(nextMovies);
    setPage(nextPage);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="wishlist">
      <Header />
      <h2>나의 위시리스트</h2>
      <InfiniteScroll
        dataLength={visibleMovies.length}
        next={fetchMoreMovies}
        hasMore={visibleMovies.length < wishlist.length}
        loader={<p>Loading...</p>}
        className="wishlist-scroll-container"
      >
        <div className="wishlist-items">
          {visibleMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <div className="movie-image-container">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.overview.slice(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {showScrollToTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default Wishlist;
