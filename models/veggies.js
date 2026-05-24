const mongoose = require('mongoose');

const veggieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
  isRoot: { type: Boolean, default: false },
  calories: { type: Number }
});

module.exports = mongoose.model('Veggies', veggieSchema);
