// frontend/src/BetsPage.js

import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './BetsPage.css';
import { motion } from 'framer-motion';

const BetsPage = () => {
  const [bets, setBets] = useState([]);
  const [user, setUser] = useState({});
  const [betAmount, setBetAmount] = useState('');
  const [betOdds, setBetOdds] = useState('');
  const [eventId, setEventId] = useState('');

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await axios.get('/api/bets/me');
        setBets(response.data);
      } catch (error) {
        console.error('Error fetching bets:', error);
      }
    };
    fetchBets();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auths/me');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const handlePlaceBet = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bets', {
        amount: betAmount,
        odds: betOdds,
        event: eventId,
      });
      setBets([...bets, response.data]);
      setBetAmount('');
      setBetOdds('');
      setEventId('');
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: -50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 50 },
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
      <h1>Bets Page</h1>
      <h2>Welcome, {user.username}</h2>
      <ul className="bets-list">
        {bets.map((bet) => (
          <motion.li
            key={bet._id}
            className="bet-item"
            whileHover={{ scale: 1.02, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          >
            <p><strong>Event:</strong> {bet.event?.name || 'Unknown'}</p>
            <p><strong>Odds:</strong> {bet.odds}</p>
            <p><strong>Amount:</strong> ${bet.amount}</p>
            <p><strong>Status:</strong> {bet.status}</p>
          </motion.li>
        ))}
      </ul>
      <form onSubmit={handlePlaceBet} className="bet-form">
        <label>
          Event ID:
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            placeholder="Enter Event ID"
          />
        </label>
        <label>
          Bet Amount:
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            required
            min="1"
            placeholder="Enter Amount"
          />
        </label>
        <label>
          Odds:
          <input
            type="number"
            step="0.01"
            value={betOdds}
            onChange={(e) => setBetOdds(e.target.value)}
            required
            min="1"
            placeholder="Enter Odds"
          />
        </label>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Place Bet
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BetsPage;
