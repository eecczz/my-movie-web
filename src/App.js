import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeMain from './components/HomeMain';
import Wishlist from './components/Wishlist';
import Popular from './components/Popular';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SearchResults from './components/SearchResults';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const isLoggedIn = !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));

  return (
    <Router basename="/my-movie-web">
      <Routes>
        {!isLoggedIn && <Route path="*" element={<Navigate to="/signin" />} />}
        <Route path="/signin" element={ <CSSTransition classNames="fade" timeout={300}><SignIn /> </CSSTransition>} />
        <Route path="/signup" element={<CSSTransition classNames="fade" timeout={300}> <SignUp /></CSSTransition>} />
        <Route path="/wishlist" element={<CSSTransition classNames="fade" timeout={300}><Wishlist /></CSSTransition>} />
        <Route path="/popular" element={<CSSTransition classNames="fade" timeout={300}><Popular /></CSSTransition>} />
        <Route path="/" element={<CSSTransition classNames="fade" timeout={300}><HomeMain /></CSSTransition>} />
        <Route path="/search" element={<CSSTransition classNames="fade" timeout={300}><SearchResults /></CSSTransition>} />
      </Routes>
    </Router>
  );
}

export default App;
