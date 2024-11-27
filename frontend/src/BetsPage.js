import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BetsPage = () => {
  const [bets, setBets] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchBets = async () => {
      const response = await axios.get('/api/bets/me');
      setBets(response.data);
    };
    fetchBets();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/api/auths/me');
      setUser(response.data);
    };
    fetchUser();
  }, []);

  const handlePlaceBet = async (bet) => {
    try {
      const response = await axios.post('/api/bets', bet);
      setBets([...bets, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Bets Page</h1>
      <h2>User: {user.username}</h2>
      <ul>
        {bets.map((bet) => (
          <li key={bet._id}>
            <p>Event: {bet.event.name}</p>
            <p>Odds: {bet.odds}</p>
            <p>Amount: {bet.amount}</p>
            <p>Status: {bet.status}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => handlePlaceBet({ amount: 10, odds: 2, event: 'Event 1' })}>
        <input type="submit" value="Place Bet" />
      </form>
    </div>
  );
};

export default BetsPage;