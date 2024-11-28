import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './BetsPage.css';

const BetsPage = () => {
  const [betEvents, setBetEvents] = useState([]);
  const [pendingBets, setPendingBets] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const maxBets = 5; // Control how many active bets are displayed

  useEffect(() => {
    const fetchBetEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bet-events', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch bet events');
        const data = await response.json();
        setBetEvents(data.slice(0, maxBets)); // Limit the number of bets displayed
      } catch (err) {
        console.error('Error fetching bet events:', err);
        setError('Failed to fetch bet events.');
      }
    };
    fetchBetEvents();
  }, []);

  const handlePlaceBet = async (eventId, option) => {
    const amountInput = prompt('Enter the amount you want to bet:');
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

      if (response.status === 201) {
        const newBet = {
          eventId,
          option,
          amount,
          timestamp: new Date().toLocaleString(),
        };
        setPendingBets((prev) => [...prev, newBet]);
        setSuccess('Bet placed successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error placing bet:', err);
      alert(err.response?.data?.error || 'Failed to place bet.');
    }
  };

  const handleDeleteBets = async () => {
    try {
      const response = await axios.delete('/api/bet-events');
      if (response.status === 200) {
        setBetEvents([]);
        alert('All active bets have been deleted.');
      }
    } catch (err) {
      console.error('Error deleting bets:', err);
      alert('Failed to delete active bets.');
    }
  };

  return (
    <div className="bets-page">
      <h1>Active Bets</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <button className="delete-button" onClick={handleDeleteBets}>
        Delete All Active Bets
      </button>

      <ul className="bets-list">
        {betEvents.map((event) => (
          <li key={event._id} className="bet-item">
            <h2>{event.topic}</h2>
            <p>{event.blurb}</p>
            <div className="options">
              {event.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handlePlaceBet(event._id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <h1>Pending Bets</h1>
      {pendingBets.length > 0 ? (
        <ul className="bets-list">
          {pendingBets.map((bet, index) => (
            <li key={index} className="bet-item">
              <h2>Bet on: {bet.option}</h2>
              <p>Amount: ${bet.amount}</p>
              <p>Placed at: {bet.timestamp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending bets.</p>
      )}
    </div>
  );
};

export default BetsPage;
