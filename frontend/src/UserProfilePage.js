import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/api/auths/me');
      setUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>User Profile Page</h1>
      <h2>Username: {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Balance: {user.balance}</p>
    </div>
  );
};

export default UserProfilePage;