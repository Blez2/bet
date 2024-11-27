// frontend/src/CollectiblesPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CollectiblesPage.css';

const CollectiblesPage = () => {
  const [collectibles, setCollectibles] = useState([]);

  useEffect(() => {
    const fetchCollectibles = async () => {
      try {
        const response = await axios.get('/api/collectibles');
        setCollectibles(response.data);
      } catch (error) {
        console.error('Error fetching collectibles:', error);
      }
    };
    fetchCollectibles();
  }, []);

  return (
    <div className="collectibles-page">
      <h1>Collectibles Page</h1>
      <ul className="collectibles-list">
        {collectibles.map((collectible) => (
          <li key={collectible._id} className="collectible-item">
            {collectible.imageUrl && (
              <img src={collectible.imageUrl} alt={collectible.name} />
            )}
            <h3>{collectible.name}</h3>
            <p>{collectible.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectiblesPage;
