import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Header from './Header';
import { fetchMovies, URLS } from '../services/URL';
import { FaHeart } from 'react-icons/fa'; // 좋아요 아이콘
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

  const renderMovies = (movies) => (
    movies.map((movie) => {
      const isRecommended = recommendedMovies.some((item) => item.id === movie.id);
      return (
        <div key={movie.id} className="movie-item" onClick={() => toggleRecommendation(movie)}>
          <div className="movie-image-container">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            {isRecommended && (
              <div className="recommendation-badge">추천 영화</div>
            )}
            <div className="movie-info">
              <h3>
                {movie.title}
                <button
                  className="wishlist-button"
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트 전파 방지
                    toggleRecommendation(movie);
                  }}
                >
                  <FaHeart color={isRecommended ? 'red' : 'white'} />
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
      <h2>추천 영화</h2>
      <div className="recommended-container">
        {recommendedMovies.length > 0 ? (
          recommendedMovies.map((movie) => (
            <div key={movie.id} className="recommended-movie">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))
        ) : (
          <p>추천 영화가 없습니다. 영화를 클릭하여 추가하세요!</p>
        )}
      </div>

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
