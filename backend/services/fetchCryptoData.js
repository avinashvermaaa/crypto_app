import axios from 'axios';
import CurrentCrypto from '../models/CurrentCrypto.js';
import HistoricalCrypto from '../models/HistoricalCrypto.js';

export const fetchAndStoreCryptoData = async () => {
  try {
    console.log('Fetching crypto data from CoinGecko...');

    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: false
        }
      }
    );

    // Store current data
    await CurrentCrypto.deleteMany({});
    await CurrentCrypto.insertMany(data);

    // Save historical snapshot
    const historical = new HistoricalCrypto({ data });
    await historical.save();

    console.log('Crypto data updated successfully!');
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};