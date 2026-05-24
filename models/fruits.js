const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  sweetness: { type: Number, min: 1, max: 10 },
  seeds: { type: Boolean, default: false }
});

module.exports = mongoose.model('Fruits', fruitSchema);
