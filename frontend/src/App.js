import React from 'react';
import Header from './components/Header';
import CryptoList from './components/CryptoList';
import './styles/App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <CryptoList />
    </div>
  );
};

export default App;