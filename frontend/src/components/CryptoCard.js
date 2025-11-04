import React from 'react';

const CryptoCard = ({ crypto }) => {
  return (
    <div className="crypto-card">
      <h3>{crypto.name} ({crypto.symbol?.toUpperCase()})</h3>
      <p>💰 Current Price: ${crypto.current_price?.toLocaleString()}</p>
      <p>📈 24h Change: {crypto.price_change_percentage_24h?.toFixed(2)}%</p>
      <p>🏦 Market Cap.: ${crypto.market_cap?.toLocaleString()}</p>
      <p>📅 Last Updated: {new Date(crypto.last_updated).toLocaleString()}</p>
    </div>
  );
};

export default CryptoCard;