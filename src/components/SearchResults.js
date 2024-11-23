import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDynamicMovies } from '../services/URL';
import './SearchResults.css';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 필터 상태 관리
  const [filters, setFilters] = useState({
    genre: '',
    rating: '',
    sort: '',
  });

  // TMDb API에서 데이터를 가져오기
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        ...(filters.genre && { with_genres: filters.genre }),
        ...(filters.rating && { 'vote_average.gte': filters.rating }),
        ...(filters.sort && { sort_by: filters.sort }),
      };
      const data = await fetchDynamicMovies(query, params);
      setMovies((prev) => [...prev, ...data.results]);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  // 클라이언트 측 필터와 정렬 적용
  const applyFiltersAndSorting = () => {
    let updatedMovies = [...movies];

    // 장르 필터
    if (filters.genre) {
      updatedMovies = updatedMovies.filter((movie) =>
        movie.genre_ids.includes(parseInt(filters.genre, 10))
      );
    }

    // 평점 필터
    if (filters.rating) {
      updatedMovies = updatedMovies.filter(
        (movie) => movie.vote_average >= parseFloat(filters.rating)
      );
    }

    // 정렬
    if (filters.sort) {
      updatedMovies.sort((a, b) => {
        switch (filters.sort) {
          case 'popularity.desc':
            return b.popularity - a.popularity;
          case 'release_date.desc':
            return new Date(b.release_date) - new Date(a.release_date);
          case 'vote_average.desc':
            return b.vote_average - a.vote_average;
          default:
            return 0;
        }
      });
    }

    setFilteredMovies(updatedMovies);
  };

  // 데이터 가져오기
  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies();
  }, [query, filters]);

  useEffect(() => {
    if (page > 1) fetchMovies();
  }, [page]);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [movies, filters]);

  const resetFilters = () => {
    setFilters({ genre: '', rating: '', sort: '' });
  };

  const renderMovies = () =>
    filteredMovies.map((movie) => (
      <div key={movie.id} className="movie-item">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p>평점: {movie.vote_average}</p>
        <p>개봉일: {movie.release_date}</p>
      </div>
    ));

  if (loading && page === 1) return <div className="loading">검색 중...</div>;

  return (
    <div className="search-results">
      <h2>검색 결과: "{query}"</h2>

      {/* 필터 UI */}
      <div className="filters">
        <select
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
        >
          <option value="">장르 선택</option>
          <option value="28">액션</option>
          <option value="35">코미디</option>
          <option value="18">드라마</option>
          <option value="878">SF</option>
        </select>

        <select
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        >
          <option value="">평점 선택</option>
          <option value="5">5점 이상</option>
          <option value="7">7점 이상</option>
          <option value="9">9점 이상</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="">정렬 선택</option>
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">최신 개봉순</option>
          <option value="vote_average.desc">평점순</option>
        </select>

        <button onClick={resetFilters}>초기화</button>
      </div>

      <InfiniteScroll
        dataLength={filteredMovies.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
      >
        <div className="movies-grid">{renderMovies()}</div>
      </InfiniteScroll>
    </div>
  );
}

export default SearchResults;
