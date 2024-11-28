// frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from '../axiosConfig';

// Create the AuthContext with default values
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state to handle initial fetch

  useEffect(() => {
    // Fetch the current user on component mount
    const fetchUser = async () => {
      try {
        const response = await axios.get('/auth/me'); // API call to get user info
        setUser(response.data); // Set user data
      } catch (error) {
        setUser(null); // If not authenticated, set user to null
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
