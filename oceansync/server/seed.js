const mongoose = require('mongoose');
const DataPoint = require('./models/DataPoint');
const Alert = require('./models/Alert');
const Vessel = require('./models/Vessel');
const mockData = require('./data/mock.json');

const seedDatabase = async () => {
  try {
    await DataPoint.deleteMany({});
    await Alert.deleteMany({});
    await Vessel.deleteMany({});

    await DataPoint.insertMany(mockData.dataPoints);
    await Alert.insertMany(mockData.alerts);
    await Vessel.insertMany(mockData.vessels);

    console.log('Database seeded with mock data successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
