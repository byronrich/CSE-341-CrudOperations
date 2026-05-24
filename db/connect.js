const { MongoClient } = require('mongodb');

let db;

async function connectToMongo() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();

    // Explicitly select the database from your connection string
    const dbName = process.env.MONGO_URI.split('/').pop();
    db = client.db(dbName);

    console.log(`Connected to MongoDB database: ${dbName}`);
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
