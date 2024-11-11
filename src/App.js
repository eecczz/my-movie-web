// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeMain from './components/HomeMain';
import Login from './components/Login';
import { URLS } from './services/URL';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router basename="/my-movie-web"> {/* basename 설정 */}
      <Routes>
        <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
        <Route path="/home" element={<HomeMain url={URLS.popularMovies(1)} />} />
      </Routes>
    </Router>
  );
}

export default App;
