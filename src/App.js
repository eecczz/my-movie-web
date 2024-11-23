import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomeMain from './components/HomeMain';
import Popular from './components/Popular';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Wishlist from './components/Wishlist';
import SearchResults from './components/SearchResults';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const isLoggedIn = !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          {!isLoggedIn && <Route path="*" element={<Navigate to="/signin" />} />}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/" element={<HomeMain />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router basename="/my-movie-web">
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
