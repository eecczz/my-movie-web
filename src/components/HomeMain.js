import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Header from './Header';
import { fetchMovies, URLS } from '../services/URL';
import { FaHeart } from 'react-icons/fa';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import './HomeMain.css';

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  draggable: false,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

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
  const [recommendedMovies, setRecommendedMovies] = useState(
    JSON.parse(localStorage.getItem('recommendedMovies')) || []
  );
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

  const toggleRecommendation = (movie) => {
    const isRecommended = recommendedMovies.some((item) => item.id === movie.id);
    const updatedRecommendedMovies = isRecommended
      ? recommendedMovies.filter((item) => item.id !== movie.id) // 제거
      : [...recommendedMovies, movie]; // 추가

    setRecommendedMovies(updatedRecommendedMovies);
    localStorage.setItem('recommendedMovies', JSON.stringify(updatedRecommendedMovies));
  };

  const handleWishlistToggle = (movie) => {
    const isAlreadyInWishlist = wishlist.some((item) => item.id === movie.id);
    const updatedWishlist = isAlreadyInWishlist
      ? wishlist.filter((item) => item.id !== movie.id) // 제거
      : [...wishlist, movie]; // 추가

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const renderMovies = (movies, showTag = true) => (
    movies.map((movie) => {
      const isRecommended = recommendedMovies.some((item) => item.id === movie.id);
      return (
        <div key={movie.id} className="movie-item" onClick={() => toggleRecommendation(movie)}>
          <div className="movie-image-container">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            {/* 추천 영화 태그를 표시 여부 결정 */}
            {isRecommended && showTag && (
              <div className="recommendation-badge">추천 영화</div>
            )}
            <div className="movie-info">
              <h3>
                {movie.title}
                <button
                  className="wishlist-button"
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트 전파 방지
                    handleWishlistToggle(movie);
                  }}
                >
                  <FaHeart color={wishlist.some((item) => item.id === movie.id) ? 'gray' : 'white'} />
                </button>
              </h3>
              <p>{movie.overview.slice(0, 60)}...</p>
            </div>
          </div>
        </div>
      );
    })
  );
  

  return (
    <div className="home-main">
      <Header />

      {/* 추천 영화 */}
      <h2>추천 영화</h2>
      <div className="slider-container">
        {recommendedMovies.length > 0 ? (
          <Slider {...sliderSettings}>
            {renderMovies(recommendedMovies, false)} {/* 태그 숨김 */}
          </Slider>
        ) : (
          <p>추천 영화가 없습니다. 영화를 클릭하여 추가하세요!</p>
        )}
      </div>


      {/* 인기 영화 */}
      <h2>인기 영화</h2>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {renderMovies(popularMovies)}
        </Slider>
      </div>

      {/* 최고 평점 영화 */}
      <h2>최고평점 영화</h2>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {renderMovies(topRatedMovies)}
        </Slider>
      </div>

      {/* 출시될 영화 */}
      <h2>출시될 영화</h2>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {renderMovies(upcomingMovies)}
        </Slider>
      </div>

      {/* 액션 영화 */}
      <h2>액션 영화</h2>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {renderMovies(discoverMovies)}
        </Slider>
      </div>
    </div>
  );
}

export default HomeMain;
