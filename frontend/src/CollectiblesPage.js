import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CollectiblesPage = () => {
  const [collectibles, setCollectibles] = useState([]);

  useEffect(() => {
    const fetchCollectibles = async () => {
      const response = await axios.get('/api/collectibles');
      setCollectibles(response.data);
    };
    fetchCollectibles();
  }, []);

  return (
    <div>
      <h1>Collectibles Page</h1>
      <ul>
        {collectibles.map((collectible) => (
          <li key={collectible._id}>
            <p>Name: {collectible.name}</p>
            <p>Description: {collectible.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectiblesPage;