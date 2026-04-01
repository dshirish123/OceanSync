const mongoose = require('mongoose');

const dataPointSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  pollutionLevel: Number,
  temperature: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DataPoint', dataPointSchema);
