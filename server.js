require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { User, Sensor, Vessel, Threat, History, Report } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'oceansync-marine-intel-x7k9m2';
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// ── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname), { index: false }));

// ── Database Connection ──────────────────────────────────────
let isMongo = false;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('  [DB] Connected to MongoDB Atlas Cloud.');
      isMongo = true;
    })
    .catch(err => {
      console.error('  [DB] Cloud Connection Failed. Falling back to local JSON.', err);
    });
} else {
  console.log('  [DB] No MONGODB_URI found. Using local JSON Database.');
}

// ── Hybrid Database Helpers ──────────────────────────────
function readDB() {
  if (isMongo) return null; // MongoDB uses models directly
  if (!fs.existsSync(DB_PATH)) return { admin: {}, sensors: [], vessels: [], threats: [], history: {}, reports: [] };
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
function writeDB(data) {
  if (isMongo) return;
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ── Auth Middleware ─────────────────────────────────────────
function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ── Seed Database on First Run ──────────────────────────────
async function seedDatabase() {
  if (isMongo) {
    const userCount = await User.countDocuments();
    if (userCount > 0) return;
    console.log('[DB] Seeding MongoDB Cloud data...');
    const hashed = await bcrypt.hash('admin', 10);
    await new User({ username: 'admin', password: hashed, role: 'operator', credits: 0 }).save();
    // (Additional seeding logic omitted for brevity in hybrid mode)
    return;
  }
  
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  if (fs.existsSync(DB_PATH)) return;

  console.log('[DB] Seeding massive local JSON database...');
  const hashedPassword = await bcrypt.hash('admin', 10);
  
  // Generator Functions
  const rLat = () => (Math.random() * 120 - 60).toFixed(2);
  const rLng = () => (Math.random() * 360 - 180).toFixed(2);
  const rNum = (min, max) => (Math.random() * (max - min) + min).toFixed(1);
  
  const sensors = Array.from({length: 24}, (_, i) => ({
    id: `Buoy-${i+100}`, lat: rLat(), lng: rLng(), 
    pollution: parseInt(rNum(10, 95)), sst: parseFloat(rNum(15, 32)), 
    benthic: parseFloat(rNum(2, 6)), pressure: parseInt(rNum(3000, 6000))
  }));

  const vendorNames = ['OceanClear Logistics', 'TideSweepers Inc', 'DeepBlue Recovery', 'AquaSalvage', 'Global Grid Collectors'];
  const vessels = Array.from({length: 18}, (_, i) => ({
    id: `V-${i+10}`, name: vendorNames[i%5] + ' ' + (i+1),
    type: i%3===0 ? 'Waste Extractor' : 'Scrap Hauler',
    lat: rLat(), lng: rLng(), heading: parseInt(rNum(0, 360)), speed: parseFloat(rNum(6, 18)), isDark: false
  }));

  const matTypes = ['Plastic Debris Gyre', 'Ghost Nets Accumulation', 'Timber/Log Debris', 'Scrap Metal Deposit', 'Chemical Absorbents'];
  const severities = ['Moderate', 'Heavy', 'Critical', 'Massive'];
  const threats = Array.from({length: 12}, (_, i) => ({
    id: `J-${1000+i}`, type: matTypes[Math.floor(Math.random()*matTypes.length)],
    severity: severities[Math.floor(Math.random()*severities.length)],
    description: `Satellite detected major surface anomaly. Vendor dispatch required immediately.`,
    lat: rLat(), lng: rLng(), timestamp: new Date(Date.now() - Math.random() * 100000000).toISOString()
  }));

  const seed = {
    admin: { username: 'admin', password: hashedPassword, role: 'operator', credits: 0 },
    sensors,
    vessels,
    threats,
    history: { '2026': { plasticDensity: 88, avgSST: 28.5, threatCount: 84 } },
    reports: [ { id: 'R1', title: 'Global Grid Intelligence Dump', date: '2026-04-02', size: '142 MB' } ]
  };
  writeDB(seed);
}

// ── ROUTES ──────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'OceanSync.html'));
});

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  let user;
  
  if (isMongo) {
    user = await User.findOne({ username });
  } else {
    const db = readDB();
    if (username === db.admin.username) user = db.admin;
  }

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, username: user.username, role: user.role, credits: user.credits });
});

app.post('/api/quick-login', async (req, res) => {
  let user;
  if (isMongo) user = await User.findOne({ username: 'admin' });
  else user = readDB().admin;
  const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, username: user.username, role: user.role, credits: user.credits });
});

app.get('/api/user', protect, async (req, res) => {
  let user;
  if (isMongo) user = await User.findOne({ username: 'admin' });
  else user = readDB().admin;
  res.json({ username: user.username, role: user.role, credits: user.credits });
});

app.get('/api/dashboard', protect, async (req, res) => {
  let sensors, vessels, metrics;
  if (isMongo) {
    sensors = await Sensor.find();
    vessels = await Vessel.find();
    const threats = await Threat.countDocuments();
    const avgSST = sensors.length ? (sensors.reduce((s,v)=>s+v.sst,0)/sensors.length).toFixed(1) : 0;
    metrics = { avgSST: parseFloat(avgSST), activeSensors: sensors.length, trackedVessels: vessels.length, openThreats: threats };
  } else {
    const db = readDB();
    const avgSST = (db.sensors.reduce((sum, s) => sum + s.sst, 0) / db.sensors.length).toFixed(1);
    sensors = db.sensors; vessels = db.vessels;
    metrics = { avgSST: parseFloat(avgSST), activeSensors: db.sensors.length, trackedVessels: db.vessels.length, openThreats: db.threats.length };
  }
  res.json({ stats: metrics, sensors, vessels });
});

app.get('/api/analytics', protect, async (req, res) => {
  if (isMongo) res.json({ sensors: await Sensor.find() });
  else res.json({ sensors: readDB().sensors });
});

app.get('/api/threats', protect, async (req, res) => {
  if (isMongo) {
    const t = await Threat.find();
    const u = await User.findOne({ username: 'admin' });
    res.json({ threats: t, credits: u.credits });
  } else {
    const db = readDB();
    res.json({ threats: db.threats, credits: db.admin.credits });
  }
});

app.delete('/api/threats/:id', protect, async (req, res) => {
  if (isMongo) {
    await Threat.deleteOne({ uid: req.params.id });
    const u = await User.findOneAndUpdate({ username: 'admin' }, { $inc: { credits: 50 } }, { new: true });
    const count = await Threat.countDocuments();
    res.json({ message: 'Resolved', credits: u.credits, remaining: count });
  } else {
    const db = readDB();
    const before = db.threats.length;
    db.threats = db.threats.filter(t => t.id !== req.params.id);
    if (db.threats.length === before) return res.status(404).json({ error: 'Not found' });
    db.admin.credits += 50;
    writeDB(db);
    res.json({ message: 'Resolved', credits: db.admin.credits, remaining: db.threats.length });
  }
});

app.get('/api/history', protect, async (req, res) => {
  if (isMongo) {
    const h = await History.find();
    const map = {}; h.forEach(i=>map[i.year]=i);
    res.json(map);
  } else res.json(readDB().history);
});

app.get('/api/reports', protect, async (req, res) => {
  if (isMongo) res.json({ reports: await Report.find() });
  else res.json({ reports: readDB().reports });
});

// ── Start Server ────────────────────────────────────────────
seedDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n  [SYSTEM] OceanSync Server Live on :${PORT}`);
    console.log(`  [STATUS] ${isMongo ? 'CLOUD MONGO ATLAS' : 'LOCAL JSON FILE'}\n`);
  });
});

