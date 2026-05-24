const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'cse341'
    });

    console.log('Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = { connectToMongo };
