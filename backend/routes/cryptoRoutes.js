import express from 'express';
import CurrentCrypto from '../models/CurrentCrypto.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cryptos = await CurrentCrypto.find({});
    res.json(cryptos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;