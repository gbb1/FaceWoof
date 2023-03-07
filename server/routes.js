const express = require('express');
const { discoverUsers, userResponse } = require('./controllers');

const router = express.Router();

router.get('/api/discover', discoverUsers);

router.post('/api/response', userResponse);

module.exports = router;
