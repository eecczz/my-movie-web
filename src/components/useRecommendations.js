// useRecommendations.js (Custom Hook)
import { useState, useEffect } from 'react';

function useRecommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const storedRecommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
    setRecommendations(storedRecommendations);
  }, []);

  const toggleRecommendation = (movie) => {
    const isAlreadyRecommended = recommendations.some((item) => item.id === movie.id);
    const updatedRecommendations = isAlreadyRecommended
      ? recommendations.filter((item) => item.id !== movie.id)
      : [...recommendations, movie];

    setRecommendations(updatedRecommendations);
    localStorage.setItem('recommendations', JSON.stringify(updatedRecommendations));
  };

  return { recommendations, toggleRecommendation };
}

export default useRecommendations;
