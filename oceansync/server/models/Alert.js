const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  id: String,
  type: String,
  severity: String,
  message: String,
  lat: Number,
  lng: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);
