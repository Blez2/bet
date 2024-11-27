// frontend/src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BetsPage from './BetsPage';
import UserProfilePage from './UserProfilePage';
import CollectiblesPage from './CollectiblesPage';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/bets" element={<BetsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/collectibles" element={<CollectiblesPage />} />
          <Route path="/" element={<h1>Welcome to the React Betting App</h1>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
