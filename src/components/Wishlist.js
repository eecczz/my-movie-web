// Wishlist.js
import React, { useEffect, useState } from 'react';
import Header from './Header';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <div className="wishlist">
      <Header />
      <h2>나의 위시리스트</h2>
      <div className="wishlist-items">
        {wishlist.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview.slice(0, 60)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
