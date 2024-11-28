// frontend/src/CollectiblesPage.js

import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './CollectiblesPage.css';
import { motion } from 'framer-motion';

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

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <motion.div
      className="collectibles-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Collectibles Page</h1>
      <ul className="collectibles-list">
        {collectibles.map((collectible) => (
          <motion.li
            key={collectible._id}
            className="collectible-item"
            whileHover={{ scale: 1.02, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          >
            {collectible.imageUrl && (
              <motion.img
                src={collectible.imageUrl}
                alt={collectible.name}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <h3>{collectible.name}</h3>
            <p>{collectible.description}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default CollectiblesPage;
