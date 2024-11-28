// frontend/src/Navbar.js

import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaDollarSign, FaGem, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Navbar.css';
import axios from './axiosConfig';
import { AuthContext } from './context/AuthContext'; // Import AuthContext

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext); // Consume AuthContext

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout'); // Ensure the correct API path
      setUser(null); // Clear user from context
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="navbar-container">
        <h2 className="navbar-logo" onClick={() => navigate(user ? '/profile' : '/')}>
          BettingApp
        </h2>
        <ul className="navbar-menu">
          <li className="navbar-item">
            {user ? (
              <NavLink to="/profile" className="navbar-link">
                <FaUser /> Profile
              </NavLink>
            ) : (
              <NavLink to="/" className="navbar-link" end>
                <FaHome /> Home
              </NavLink>
            )}
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
          {user ? (
            <li className="navbar-item">
              <motion.div
                className="navbar-link logout-link"
                onClick={handleLogout}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignOutAlt /> Logout
              </motion.div>
            </li>
          ) : (
            <li className="navbar-item">
              <NavLink to="/login" className="navbar-link">
                <FaUser /> Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
