// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Get the root DOM element
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
