const express = require('express');
const DataPoint = require('../models/DataPoint');
const Alert = require('../models/Alert');
const Vessel = require('../models/Vessel');

const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const data = await DataPoint.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data points' });
  }
});

router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find({});
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

router.get('/vessels', async (req, res) => {
  try {
    const vessels = await Vessel.find({});
    res.json(vessels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vessels' });
  }
});

module.exports = router;
