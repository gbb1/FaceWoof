const express = require('express');
const { discoverUsers } = require('./controllers');

const router = express.Router();

router.get('/api/discover', discoverUsers);

module.exports = router;
