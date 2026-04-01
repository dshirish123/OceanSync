const mongoose = require('mongoose');

// ── User Schema ─────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'operator' },
  credits: { type: Number, default: 0 }
});

// ── Sensor Schema ───────────────────────────────────────────
const sensorSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // renamed from 'id' to 'uid' for clarity
  lat: Number,
  lng: Number,
  pollution: Number,
  sst: Number,
  benthic: Number,
  pressure: Number
});

// ── Vessel Schema ───────────────────────────────────────────
const vesselSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  type: String,
  lat: Number,
  lng: Number,
  heading: Number,
  speed: Number,
  isDark: Boolean
});

// ── Threat Schema ───────────────────────────────────────────
const threatSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  type: String,
  severity: String,
  description: String,
  lat: Number,
  lng: Number,
  timestamp: { type: Date, default: Date.now }
});

// ── History Schema ──────────────────────────────────────────
const historySchema = new mongoose.Schema({
  year: { type: String, required: true, unique: true },
  plasticDensity: Number,
  avgSST: Number,
  threatCount: Number
});

// ── Report Schema ───────────────────────────────────────────
const reportSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  title: String,
  date: String,
  size: String
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Sensor: mongoose.model('Sensor', sensorSchema),
  Vessel: mongoose.model('Vessel', vesselSchema),
  Threat: mongoose.model('Threat', threatSchema),
  History: mongoose.model('History', historySchema),
  Report: mongoose.model('Report', reportSchema)
};
