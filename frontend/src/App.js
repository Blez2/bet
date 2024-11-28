// frontend/src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BetsPage from './BetsPage';
import UserProfilePage from './UserProfilePage';
import CollectiblesPage from './CollectiblesPage';
import LandingPage from './LandingPage'; // Import LandingPage
import LoginPage from './LoginPage'; // Import LoginPage
import { AnimatePresence } from 'framer-motion';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bets" element={<BetsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/collectibles" element={<CollectiblesPage />} />
        <Route path="/" element={<LandingPage />} /> {/* Set LandingPage as Home */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
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
