import express from 'express';
import HistoricalCrypto from '../models/HistoricalCrypto.js';

const router = express.Router();

// Get historical snapshots for a specific coin
router.get('/:coinId', async (req, res) => {
  try {
    const coinId = req.params.coinId;
    // Get all historical snapshots
    const snapshots = await HistoricalCrypto.find({});
    // Flatten and filter by coin
    const coinHistory = snapshots
      .map(snapshot => snapshot.data.find(c => c.id === coinId))
      .filter(Boolean);
    res.json(coinHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
