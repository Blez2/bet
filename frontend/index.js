import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the main App component

// Render the App component into the root div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
