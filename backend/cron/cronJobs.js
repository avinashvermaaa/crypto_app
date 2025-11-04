import cron from 'node-cron';
import { fetchAndStoreCryptoData } from '../services/fetchCryptoData.js';

// Runs every hour
export const startCronJobs = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('Running hourly crypto data sync...');
    await fetchAndStoreCryptoData();
  });
  console.log('Cron job scheduled: runs every hour');
};
