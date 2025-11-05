import express from 'express';
import HistoricalCrypto from '../models/HistoricalCrypto.js';

const router = express.Router();

router.get('/:coinId', async (req, res) => {
  try {
    const { coinId } = req.params;
    const snapshots = await HistoricalCrypto.find({});

    const coinHistory = snapshots
      .map(snapshot => {
        const coin = snapshot.data.find(c => c.id === coinId);
        if (!coin) return null;

        return {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          timestamp: snapshot.timestamp,
        };
      })
      .filter(Boolean);

    // Sort by oldest to newest
    coinHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    res.json(coinHistory);
  } catch (err) {
    console.error('Error fetching historical data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
