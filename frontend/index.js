import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Ensure the path to App.js is correct
import './index.css'; // Optional, only if you have global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Must match the "root" ID in index.html
);
