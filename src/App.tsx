import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import GameComponent from './components/GameComponent';

function GamePage() {
  const location = useLocation();
  const is911Page = location.pathname === '/911';

  return (
    <>
      <Helmet>
        <title>{is911Page ? 'Flight Simulator' : 'Flappy Bird Game'}</title>
        <meta name="description" content={is911Page ? 'Flight simulator game' : 'Play the classic Flappy Bird game - Test your skills and beat your high score in this addictive arcade game!'} />
        <meta name="robots" content={is911Page ? 'noindex, nofollow' : 'index, follow'} />
      </Helmet>
      <GameComponent />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/911" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;