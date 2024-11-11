// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeMain from './components/HomeMain';
import Wishlist from './components/Wishlist';
import Popular from './components/Popular';

function App() {
  return (
    <Router basename="/my-movie-web">
      <Routes>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/" element={<HomeMain />} />
      </Routes>
    </Router>
  );
}

export default App;
