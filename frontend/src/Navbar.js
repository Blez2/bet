// frontend/src/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaDollarSign, FaGem, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const linkVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
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
    </motion.nav>
  );
};

export default Navbar;
