const { MongoClient } = require('mongodb');

let db;

async function connectToMongo() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    db = client.db(); // Uses the DB name from your connection string
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToMongo() first.');
  }
  return db;
}

module.exports = { connectToMongo, getDb };
