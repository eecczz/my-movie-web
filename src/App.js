// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeMain from './components/HomeMain';
import Wishlist from './components/Wishlist';
import Popular from './components/Popular';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SearchResults from './components/SearchResults';

function App() {
  const isLoggedIn = !!localStorage.getItem('authToken');

  return (
    <Router basename="/my-movie-web">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/wishlist"
          element={isLoggedIn ? <Wishlist /> : <Navigate to="/signin" />}
        />
        <Route
          path="/popular"
          element={isLoggedIn ? <Popular /> : <Navigate to="/signin" />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <HomeMain /> : <Navigate to="/signin" />}
        />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
