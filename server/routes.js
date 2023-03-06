const express = require('express');
const { getMatches } = require('./controllers/discover');

const router = express.Router();

router.get('/api/discover', getMatches);

module.exports = router;
