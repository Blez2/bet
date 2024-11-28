// frontend/src/BetsPage.js

import React, { useState, useEffect, useContext } from 'react';
import axios from './axiosConfig';
import './BetsPage.css';
import { motion } from 'framer-motion';
import { AuthContext } from './context/AuthContext';

const BetsPage = () => {
  const [betEvents, setBetEvents] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchBetEvents = async () => {
      try {
        const response = await axios.get('/api/bet-events');
        setBetEvents(response.data);
      } catch (error) {
        console.error('Error fetching bet events:', error);
        setError('Failed to fetch bet events.');
      }
    };
    fetchBetEvents();
  }, []);

  const handlePlaceBet = async (eventId, option, odds) => {
    const amountInput = prompt('Enter bet amount:');
    if (!amountInput) return;
    const amount = Number(amountInput);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid bet amount.');
      return;
    }

    try {
      const response = await axios.post(`/api/bet-events/${eventId}/bets`, {
        option,
        amount,
      });
      setSuccess('Bet placed successfully!');

      // Update user balance
      const updatedUserResponse = await axios.get('/auth/me');
      setUser(updatedUserResponse.data);

      // Clear success message after a delay
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error placing bet:', error);
      alert(error.response?.data?.error || 'Failed to place bet.');
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: -20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <motion.div
      className="bets-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Available Bet Events</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <ul className="bets-list">
        {betEvents.map((event) => (
          <motion.li
            key={event._id}
            className="bet-item"
            whileHover={{ scale: 1.02, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          >
            <h2>{event.topic}</h2>
            <p>{event.blurb}</p>
            <div className="options">
              {event.options.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => handlePlaceBet(event._id, option, event.odds[option])}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option} (Odds: {event.odds[option]})
                </motion.button>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default BetsPage;
