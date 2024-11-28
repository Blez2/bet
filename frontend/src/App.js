// frontend/src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Updated path
import Footer from './Footer';
import BetsPage from './BetsPage';
import UserProfilePage from './UserProfilePage';
import CollectiblesPage from './CollectiblesPage';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import PrivateRoute from './components/PrivateRoute'; // Ensure this path is correct

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/bets"
          element={
            <PrivateRoute>
              <BetsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/collectibles"
          element={
            <PrivateRoute>
              <CollectiblesPage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
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
