import React, { useState, useEffect } from 'react';
import SortableTable from './SortableTable';
import HistoricalChart from './HistoricalChart';
import axios from 'axios';

const CryptoCard = ({ cryptos }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Fetch historical data when selectedCoin changes
  useEffect(() => {
    if (!selectedCoin) return;

    const fetchHistorical = async () => {
      try {
        setLoadingHistory(true);
        const { data } = await axios.get(`http://localhost:5000/api/historical/${selectedCoin}`);
        setHistoricalData(data);
        setLoadingHistory(false);
      } catch (error) {
        console.error('Error fetching historical data:', error);
        setHistoricalData([]);
        setLoadingHistory(false);
      }
    };

    fetchHistorical();
  }, [selectedCoin]);

  if (!cryptos || cryptos.length === 0) {
    return <h3>No data available 😕</h3>;
  }

  const columns = [
    { key: 'index', label: '#' },
    {
      key: 'name',
      label: 'Coin',
      format: (val, row) => (
        <span
          style={{ cursor: 'pointer', color: '#2575fc' }}
          onClick={() =>
            setSelectedCoin(selectedCoin === row.id ? null : row.id)
          }
        >
          {val} ({row.symbol?.toUpperCase()})
        </span>
      ),
    },
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

  return (
    <div>
      <SortableTable data={cryptos} columns={columns} />

      {/* Render Historical Chart for selected coin */}
      {selectedCoin && (
        <div style={{ marginTop: '20px' }}>
          {loadingHistory ? (
            <p>Loading historical data for {selectedCoin}...</p>
          ) : (
            <HistoricalChart
              historicalData={historicalData}
              coinName={selectedCoin}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CryptoCard;
