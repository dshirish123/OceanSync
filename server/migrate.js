require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { User, Sensor, Vessel, Threat, History, Report } = require('./models');

const DB_PATH = path.join(__dirname, 'data', 'db.json');

async function migrate() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env file.');
    process.exit(1);
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected.');

    if (!fs.existsSync(DB_PATH)) {
      console.error('❌ local db.json not found. Migration aborted.');
      process.exit(1);
    }

    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

    // 1. Migrate User
    console.log('Migrating User...');
    await User.deleteMany({});
    await new User({
      username: db.admin.username,
      password: db.admin.password,
      role: db.admin.role,
      credits: db.admin.credits
    }).save();

    // 2. Migrate Sensors
    console.log('Migrating Sensors...');
    await Sensor.deleteMany({});
    await Sensor.insertMany(db.sensors.map(s => ({ ...s, uid: s.id || s.uid })));

    // 3. Migrate Vessels
    console.log('Migrating Vessels...');
    await Vessel.deleteMany({});
    await Vessel.insertMany(db.vessels.map(v => ({ ...v, uid: v.id || v.uid })));

    // 4. Migrate Threats
    console.log('Migrating Threats...');
    await Threat.deleteMany({});
    await Threat.insertMany(db.threats.map(t => ({ ...t, uid: t.id || t.uid })));

    // 5. Migrate History
    console.log('Migrating History...');
    await History.deleteMany({});
    const historyArray = Object.keys(db.history).map(year => ({
      year,
      ...db.history[year]
    }));
    await History.insertMany(historyArray);

    // 6. Migrate Reports
    console.log('Migrating Reports...');
    await Report.deleteMany({});
    await Report.insertMany(db.reports.map(r => ({ ...r, uid: r.id || r.uid })));

    console.log('\n✨ MIGRATION COMPLETE! All data pushed to Cloud.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

migrate();
