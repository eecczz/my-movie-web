// URL.js
import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const baseURL = "https://api.themoviedb.org/3";

// 랜덤 쿼리 파라미터로 캐시 방지
const getRandomCacheBuster = () => `&cache_buster=${Math.random()}`;

export const URLS = {
  popularMovies: (page) => `${baseURL}/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}${getRandomCacheBuster()}`,
  topRatedMovies: (page) => `${baseURL}/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=${page}${getRandomCacheBuster()}`,
  upcomingMovies: (page) => `${baseURL}/movie/upcoming?api_key=${apiKey}&language=ko-KR&page=${page}${getRandomCacheBuster()}`,
  discoverMovies: (page, genreId = 18) => `${baseURL}/discover/movie?api_key=${apiKey}&language=ko-KR&page=${page}&with_genres=${genreId}${getRandomCacheBuster()}`
};

export async function fetchMovies(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

// 동적 URL 호출을 위한 새 함수
export async function fetchDynamicMovies(endpoint, queryParams = {}) {
  try {
    const url = new URL(`${baseURL}${endpoint}`);
    url.searchParams.append('api_key', apiKey);
    url.searchParams.append('language', 'ko-KR');

    // 추가 쿼리 파라미터 처리
    Object.keys(queryParams).forEach((key) => {
      url.searchParams.append(key, queryParams[key]);
    });

    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error('Error fetching dynamic movies:', error);
    throw error;
  }
}