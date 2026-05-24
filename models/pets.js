const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owners' }
});

module.exports = mongoose.model('Pets', petSchema);
