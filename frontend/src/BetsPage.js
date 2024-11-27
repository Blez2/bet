import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>Bets Page</h1>
      <h2>User: {user.username}</h2>
      <ul>
        {bets.map((bet) => (
          <li key={bet._id}>
            <p>Event: {bet.event?.name || 'Unknown'}</p>
            <p>Odds: {bet.odds}</p>
            <p>Amount: {bet.amount}</p>
            <p>Status: {bet.status}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handlePlaceBet}>
        <label>
          Event ID:
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </label>
        <label>
          Bet Amount:
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          />
        </label>
        <label>
          Odds:
          <input
            type="number"
            step="0.01"
            value={betOdds}
            onChange={(e) => setBetOdds(e.target.value)}
          />
        </label>
        <button type="submit">Place Bet</button>
      </form>
    </div>
  );
};

export default BetsPage;
