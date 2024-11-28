// frontend/src/UserProfilePage.js

import React, { useContext } from 'react';
import './UserProfilePage.css';
import { motion } from 'framer-motion';
import { AuthContext } from './context/AuthContext';

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="user-profile-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>User Profile</h1>
      <div className="user-details">
        <p>
          <span>Username:</span> {user.username}
        </p>
        <p>
          <span>Email:</span> {user.email}
        </p>
        <p>
          <span>Balance:</span> ${user.balance.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default UserProfilePage;
