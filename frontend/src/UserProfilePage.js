// frontend/src/UserProfilePage.js

import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './UserProfilePage.css';
import { motion } from 'framer-motion';

const UserProfilePage = () => {
  const [user, setUser] = useState({});

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

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 },
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  };

  return (
    <motion.div
      className="user-profile-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {user.avatarUrl && (
        <motion.img
          src={user.avatarUrl}
          alt={user.username}
          className="user-avatar"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <h1>User Profile</h1>
      <div className="user-details">
        <p>
          <span>Username:</span> {user.username}
        </p>
        <p>
          <span>Email:</span> {user.email}
        </p>
        <p>
          <span>Balance:</span> ${user.balance}
        </p>
      </div>
    </motion.div>
  );
};

export default UserProfilePage;
