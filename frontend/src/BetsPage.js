import React, { useState, useEffect } from 'react';
import './BetsPage.css';

const BetsPage = () => {
  const [betEvents, setBetEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBetEvents = async () => {
      console.log('Attempting to fetch bet events using fetch...');
      try {
        const response = await fetch('http://localhost:5000/api/bet-events', {
          method: 'GET',
          credentials: 'include', // Include cookies
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to fetch:', errorData);
          setError(`Failed to fetch bet events: ${errorData.error || response.statusText}`);
          return;
        }

        const data = await response.json();
        console.log('Fetched bet events successfully:', data);
        setBetEvents(data);
      } catch (err) {
        console.error('Error fetching bet events using fetch:', err);
        setError(`Failed to fetch bet events: ${err.message}`);
      }
    };

    fetchBetEvents();
  }, []);

  return (
    <div className="bets-page">
      <h1>All Bets</h1>
      {error && <p className="error-message">{error}</p>}
      <ul className="bets-list">
        {betEvents.map((event) => (
          <li key={event._id} className="bet-item">
            <h2>{event.topic}</h2>
            <p>{event.blurb}</p>
            <p>
              <strong>Options:</strong> {event.options.join(', ')}
            </p>
            <p>
              <strong>Status:</strong> {event.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BetsPage;
