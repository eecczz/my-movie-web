// Popular.js
import React, { useState, useEffect } from 'react';
import { fetchMovies, URLS } from '../services/URL';
import Header from './Header';
import { FaHeart } from 'react-icons/fa'; // 좋아요 아이콘
import './Popular.css';

function Popular() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  );

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchMovies(URLS.popularMovies(page));
      setMovies(data.results || []);
    }
    loadMovies();
  }, [page]);

  const handleWishlistToggle = (movie) => {
    const isAlreadyInWishlist = wishlist.some((item) => item.id === movie.id);
    const updatedWishlist = isAlreadyInWishlist
      ? wishlist.filter((item) => item.id !== movie.id) // 제거
      : [...wishlist, movie]; // 추가

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="popular">
        <Header />
      <h2>대세 콘텐츠</h2>
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <div className="movie-image-container">
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h3>
                  {movie.title}
                  <button
                    className="wishlist-button"
                    onClick={() => handleWishlistToggle(movie)}
                  >
                    <FaHeart color={wishlist.some((item) => item.id === movie.id) ? 'red' : 'white'} />
                  </button>
                </h3>
                <p>{movie.overview.slice(0, 60)}...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[1, 2, 3, 4, 5].map((pageNum) => (
          <button
            key={pageNum}
            className={page === pageNum ? 'active' : ''}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Popular;
