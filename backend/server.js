import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cryptoRoutes from './routes/cryptoRoutes.js';
import HistoricalRoutes from './routes/HistoricalRoutes.js';
import { startCronJobs } from './cron/cronJobs.js';
import { fetchCurrentCryptoData, saveHistoricalCryptoData } from './services/fetchCryptoData.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: process.env.CORS_URL }));

// Routes
app.use('/api/cryptos', cryptoRoutes);
app.use('/api/historical', HistoricalRoutes);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Fetch initial data on startup
  await fetchCurrentCryptoData();
  await saveHistoricalCryptoData();

  // Start hourly cron job
  startCronJobs();
});