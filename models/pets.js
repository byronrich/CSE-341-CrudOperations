const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true }
});

module.exports = mongoose.model('Pet', petSchema);
