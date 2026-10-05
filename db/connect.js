const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const initDb = async () => {
  if (db) {
    return db;
  }
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  db = client.db(process.env.DB_NAME || 'cse341');
  return db;
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { initDb, getDb };