const { MongoClient } = require('mongodb');

let db;

async function connectToMongo() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();

    // Explicitly select the correct database from your cluster
    db = client.db('cse341');

    console.log('Connected to MongoDB database: cse341');
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
