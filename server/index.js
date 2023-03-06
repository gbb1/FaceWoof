const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db/database');
require('dotenv').config();

const db = require('./db');
const router = require('./routes');

const app = express();

// ----- Middleware ----- //
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

// ----- Request handling ----- //
app.use(router);

db.connect().then(() => {
  console.log('database connected');
  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });
}).catch(err => console.log(err));

module.exports = app;
