// frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from '../axiosConfig';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/auth/me');
        setUser(response.data);
        console.log('User fetched:', response.data);
      } catch (error) {
        setUser(null);
        console.log('No authenticated user.');
      } finally {
        setLoading(false);
        console.log('Loading set to false');
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
