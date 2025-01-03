// frontend/src/components/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Optionally, display a loading spinner
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
