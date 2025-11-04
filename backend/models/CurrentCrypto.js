import mongoose from 'mongoose';

const currentCryptoSchema = new mongoose.Schema({
  id: String,
  name: String,
  symbol: String,
  current_price: Number,
  market_cap: Number,
  price_change_percentage_24h: Number,
  last_updated: Date
});

export default mongoose.model('CurrentCrypto', currentCryptoSchema);