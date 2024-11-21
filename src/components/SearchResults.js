import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMovies } from '../services/URL';
import './SearchResults.css';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function searchMovies() {
      if (query) {
        try {
          // TMDb API에서 검색 결과 가져오기
          const data = await fetchMovies(`/search/movie?query=${encodeURIComponent(query)}`);
          setMovies(data.results || []);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    searchMovies();
  }, [query]);

  if (loading) return <div className="loading">검색 중...</div>;

  return (
    <div className="search-results">
      <h2>검색 결과: "{query}"</h2>
      {movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default SearchResults;
