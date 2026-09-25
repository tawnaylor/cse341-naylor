const { MongoClient } = require('mongodb');

let client;

const initDb = (callback) => {
  if (client) {
    return callback(null, client);
  }
  if (!process.env.MONGODB_URI) {
    return callback(new Error('MONGODB_URI is not set'));
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((connection) => {
      client = connection;
      callback(null, client);
    })
    .catch((err) => callback(err));
};

const getDb = () => {
  if (!client) {
    throw Error('Db not initialized');
  }
  return client.db(process.env.DB_NAME || 'cse341');
};

module.exports = { initDb, getDb };