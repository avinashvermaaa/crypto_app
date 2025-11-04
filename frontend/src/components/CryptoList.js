import React, { useEffect, useState } from 'react';
import { getTopCryptos } from '../apis/cryptoApi';
import CryptoCard from './CryptoCard';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      const data = await getTopCryptos();
      setCryptos(data);
      setLoading(false);
    };

    fetchCryptos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crypto-list">
      {cryptos.map((crypto) => (
        <CryptoCard key={crypto.id} crypto={crypto} />
      ))}
    </div>
  );
};

export default CryptoList;