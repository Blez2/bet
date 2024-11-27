// frontend/src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BetsPage from './BetsPage';
import UserProfilePage from './UserProfilePage';
import CollectiblesPage from './CollectiblesPage';
import { AnimatePresence } from 'framer-motion';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/bets" element={<BetsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/collectibles" element={<CollectiblesPage />} />
        <Route path="/" element={<h1>Welcome to the React Betting App</h1>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <AnimatedRoutes />
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
