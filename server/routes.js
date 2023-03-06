const express = require('express');
const { getMatches } = require('./controllers/discover');

const router = express.Router();

router.get('/discover', getMatches);

module.exports = router;
