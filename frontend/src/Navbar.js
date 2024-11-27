// frontend/src/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaDollarSign, FaGem, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-logo">BettingApp</h2>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink to="/" className="navbar-link" end>
              <FaHome /> Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/bets" className="navbar-link">
              <FaDollarSign /> Bets
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/collectibles" className="navbar-link">
              <FaGem /> Collectibles
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/profile" className="navbar-link">
              <FaUser /> Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
