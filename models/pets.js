const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
  ownerId: { type: String, required: false }   // FIXED
});

module.exports = mongoose.model('Pets', petSchema);
