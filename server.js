require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/', router);

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

app.listen(port, function() {
  console.log(`Server is running in ${NODE_ENV} mode on port ${port}`);
});
