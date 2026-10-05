require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongodb = require('./db/connect');
const app = express();
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/', router);

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

mongodb.initDb()
  .then(() => {
    app.listen(port, function() {
      console.log(`Connected to MongoDB. Server is running in ${NODE_ENV} mode on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exitCode = 1;
  });
