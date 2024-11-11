// HomeMain.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Header from './Header';
import { fetchMovies, URLS } from '../services/URL';
import { FaHeart } from 'react-icons/fa'; // 좋아요 아이콘
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeMain.css';

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button className="custom-arrow custom-next" onClick={onClick}>{'>'}</button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button className="custom-arrow custom-prev" onClick={onClick}>{'<'}</button>
  );
}

function HomeMain() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  );

  useEffect(() => {
    async function loadMovies() {
      try {
        const popularData = await fetchMovies(URLS.popularMovies(1));
        const topRatedData = await fetchMovies(URLS.topRatedMovies(1));
        const upcomingData = await fetchMovies(URLS.upcomingMovies(1));
        const discoverData = await fetchMovies(URLS.discoverMovies(1, 28)); // 28은 액션 장르 ID

        setPopularMovies(popularData.results || []);
        setTopRatedMovies(topRatedData.results || []);
        setUpcomingMovies(upcomingData.results || []);
        setDiscoverMovies(discoverData.results || []);
      } catch (error) {
        console.error('Error loading movies:', error);
      }
    }
    loadMovies();
  }, []);

  const handleWishlistToggle = (movie) => {
    const isAlreadyInWishlist = wishlist.some((item) => item.id === movie.id);
    const updatedWishlist = isAlreadyInWishlist
      ? wishlist.filter((item) => item.id !== movie.id) // 제거
      : [...wishlist, movie]; // 추가

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const renderMovies = (movies) => (
    movies.map((movie) => (
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
    ))
  );

  return (
    <div className="home-main">
      <Header />
      <h2>Popular Movies</h2>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {renderMovies(popularMovies)}
        </Slider>
      </div>

      <h2>Top Rated Movies</h2>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {renderMovies(topRatedMovies)}
        </Slider>
      </div>

      <h2>Upcoming Movies</h2>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {renderMovies(upcomingMovies)}
        </Slider>
      </div>

      <h2>Action Movies</h2>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {renderMovies(discoverMovies)}
        </Slider>
      </div>
    </div>
  );
}

export default HomeMain;
