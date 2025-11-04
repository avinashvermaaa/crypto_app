import cron from 'node-cron';
import { fetchCurrentCryptoData, saveHistoricalCryptoData } from '../services/fetchCryptoData.js';

export const startCronJobs = () => {
  // Every 10 minutes: update current crypto data
  cron.schedule('*/10 * * * *', async () => {
    console.log('Fetching current crypto data (every 10 min)...');
    await fetchCurrentCryptoData();
  });

  // Every hour: save historical snapshot
  cron.schedule('0 * * * *', async () => {
    console.log('Saving historical crypto data (every hour)...');
    const data = await fetchCurrentCryptoData(); // fetch latest current data first
    await saveHistoricalCryptoData(data);
  });

  console.log('Cron jobs scheduled: 10min (current) & 1h (historical)');
};
