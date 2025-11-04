import axios from 'axios';
import { config } from 'dotenv';
import CurrentCrypto from '../models/CurrentCrypto.js';
import HistoricalCrypto from '../models/HistoricalCrypto.js';

config();

// Helper: convert env string to object
const parseParams = (paramString) => {
  return paramString.split(',').reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    if (key && value) acc[key.trim()] = isNaN(value) ? value.trim() : Number(value);
    return acc;
  }, {});
};

// Fetch current crypto data only
export const fetchCurrentCryptoData = async () => {
  try {
    const params = parseParams(process.env.COINGECKO_API_PARAMS);
    const { data } = await axios.get(process.env.COINGECKO_API_URL, { params });

    // Update current data
    await CurrentCrypto.deleteMany({});
    await CurrentCrypto.insertMany(data);

    console.log('Current crypto data updated successfully!');
    return data;
  } catch (error) {
    console.error('Error fetching current crypto data:', error.message);
    return null;
  }
};

// Save historical snapshot
export const saveHistoricalCryptoData = async (data) => {
  try {
    if (!data) return;
    const historical = new HistoricalCrypto({ data });
    await historical.save();
    console.log('Historical crypto data saved successfully!');
  } catch (error) {
    console.error('Error saving historical crypto data:', error.message);
  }
};
