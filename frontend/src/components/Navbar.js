// frontend/src/components/Navbar.js

import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaDollarSign, FaGem, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Navbar.css';
import axios from '../axiosConfig'; // Corrected path
import { AuthContext } from '../context/AuthContext'; // Corrected path

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext); // Ensure AuthContext provides these

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout'); // Ensure this endpoint exists in your backend
      setUser(null); // Clear user state
      navigate('/'); // Redirect to home or login page
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally, display an error message to the user
    }
  };

  if (loading) {
    // Optionally, display a loading indicator while fetching user data
    return <div>Loading...</div>;
  }

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
          {user && (
            <>
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
            </>
          )}
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
