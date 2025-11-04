import mongoose from 'mongoose';

const historicalCryptoSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  data: [
    {
      id: String,
      name: String,
      symbol: String,
      current_price: Number,
      market_cap: Number,
      price_change_percentage_24h: Number
    }
  ]
});

export default mongoose.model('HistoricalCrypto', historicalCryptoSchema);