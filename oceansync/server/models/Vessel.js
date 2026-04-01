const mongoose = require('mongoose');

const vesselSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  lat: Number,
  lng: Number,
  heading: Number,
  speed: Number,
  isDark: Boolean,
  lastSeen: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vessel', vesselSchema);
