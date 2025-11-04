import React from 'react';
import SortableTable from './SortableTable';

const CryptoCard = ({ cryptos }) => {
  if (!cryptos || cryptos.length === 0) {
    return <h3>No data available 😕</h3>;
  }

  const columns = [
    { key: 'index', label: '#' },
    { key: 'name', label: 'Coin' },
    {
      key: 'current_price',
      label: 'Current Price',
      format: (val) => `$${val?.toLocaleString()}`,
    },
    {
      key: 'price_change_percentage_24h',
      label: '24h Change',
      format: (val) => `${val?.toFixed(2)}%`,
    },
    {
      key: 'market_cap',
      label: 'Market Cap',
      format: (val) => `$${val?.toLocaleString()}`,
    },
    {
      key: 'last_updated',
      label: 'Last Updated',
      format: (val) => new Date(val).toLocaleString(),
    },
  ];

  return <SortableTable data={cryptos} columns={columns} />;
};

export default CryptoCard;
