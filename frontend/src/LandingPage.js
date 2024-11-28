// frontend/src/LandingPage.js

import React from 'react';
import './LandingPage.css';
import { FaDollarSign, FaGem, FaUser, FaRegHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaDollarSign />,
    title: 'Place Bets',
    description: 'Easily place bets on your favorite Music and Sports with competitive odds.',
  },
  {
    icon: <FaGem />,
    title: 'Collectibles',
    description: 'Earn unique collectibles as rewards for your betting achievements. Trade them with others to build out your portfolio',
  },
  {
    icon: <FaUser />,
    title: 'User Profiles',
    description: 'Manage your profile, track your balance, and monitor your betting history.',
  },
  {
    icon: <FaRegHandshake />,
    title: 'Secure Transactions',
    description: 'Your data and transactions are protected with top-notch security measures.',
  },
];

const LandingPage = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    duration: 0.5,
  };

  return (
    <motion.div
      className="landing-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <header className="landing-header">
        <h1>Welcome to BettingApp</h1>
        <p>Your ultimate platform for exciting and secure betting experiences.</p>
        <motion.a
          href="/login"
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.a>
      </header>
      <section className="features-section">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default LandingPage;
