// frontend/src/Footer.js

import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <p>&copy; {new Date().getFullYear()} BettingApp. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </motion.footer>
  );
};

export default Footer;
