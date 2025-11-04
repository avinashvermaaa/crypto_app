import React from 'react';

const CryptoCard = ({ crypto }) => {
  return (
    <div className="crypto-card">
      <h3>{crypto.name} ({crypto.symbol.toUpperCase()})</h3>
      <p>Price: ${crypto.current_price}</p>
      <p>24h Change: {crypto.price_change_percentage_24h}%</p>
      <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CryptoCard;