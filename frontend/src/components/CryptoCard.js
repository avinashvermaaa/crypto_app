import React from 'react';

const CryptoCard = ({ cryptos }) => {
  if (!cryptos || cryptos.length === 0) {
    return <h3>No data available 😕</h3>;
  }

  return (
    <table className="crypto-table">
      <colgroup>
        <col style={{ width: '40px' }} />
        <col style={{ width: '180px' }} />
        <col style={{ width: '120px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '140px' }} />
        <col style={{ width: '160px' }} />
      </colgroup>

      <thead>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>Current Price</th>
          <th>24h Change</th>
          <th>Market Cap</th>
          <th>Last Updated</th>
        </tr>
      </thead>

      <tbody>
        {cryptos.map((crypto, index) => (
          <tr key={crypto.id || index}>
            <td>{index + 1}</td>
            <td title={`${crypto.name} (${crypto.symbol?.toUpperCase()})`}>
              {crypto.name} ({crypto.symbol?.toUpperCase()})
            </td>
            <td>${crypto.current_price?.toLocaleString()}</td>
            <td className={crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
              {crypto.price_change_percentage_24h?.toFixed(2)}%
            </td>
            <td>${crypto.market_cap?.toLocaleString()}</td>
            <td>{new Date(crypto.last_updated).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoCard;