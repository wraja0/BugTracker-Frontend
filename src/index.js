//IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Render ReactDOm
ReactDOM.render(
  // Runs Strictmode for dev builds 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// Web Vitals
reportWebVitals();
