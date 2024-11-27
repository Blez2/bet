// frontend/src/UserProfilePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfilePage.css';

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

  return (
    <div className="user-profile-page">
      {user.avatarUrl && (
        <img src={user.avatarUrl} alt={user.username} className="user-avatar" />
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
    </div>
  );
};

export default UserProfilePage;
