// frontend/src/LoginPage.js

import React, { useState, useContext, useEffect } from 'react';
import './LoginPage.css';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from './context/AuthContext'; // Import AuthContext
import { toast } from 'react-toastify'; // Import toast

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    balance: 0, // Default balance
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext); // Consume AuthContext

  useEffect(() => {
    if (!loading && user) {
      // If user is already logged in, redirect to /bets
      navigate('/bets');
    }
  }, [user, navigate, loading]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
      balance: 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let response;
      if (isLogin) {
        // Login Request
        response = await axios.post('/auth/login', {
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Signup Request
        response = await axios.post('/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          balance: formData.balance,
        });
      }

      // Assuming response.data.user contains the user
      setUser(response.data.user); // Set user in AuthContext
      console.log('User state updated:', response.data.user);

      toast.success(isLogin ? 'Logged in successfully!' : 'Registered successfully!');

      navigate('/bets'); // Redirect to Bets page
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
      console.error('Login/Signup error:', err);
      toast.error(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  const pageTransition = {
    duration: 0.5,
  };

  if (loading) {
    // Optionally, display a loading spinner while fetching user data
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="login-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
              />
            </label>
          )}
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </label>
          {!isLogin && (
            <label>
              Initial Balance:
              <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                min="0"
                placeholder="Enter initial balance"
              />
            </label>
          )}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <motion.span
            className="toggle-link"
            onClick={toggleMode}
            whileHover={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </motion.span>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
