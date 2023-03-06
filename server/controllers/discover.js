const axios = require('axios');
require('dotenv').config();
const {
  generateDiscoverFeed,
} = require('../db');

const apiKey = process.env.ZIPCODE_APIKEY;
const url = process.env.ZIPCODE_URI;

const getMatches = async (req, res) => {
  try {
    const {
      id, zipcode, radius, count,
    } = req.query;
    const { data } = await axios.get(`${url}/${apiKey}/radius.json/${zipcode}/${radius}/mile`);
    const matchedZipcodes = data.reduce((acc, el, index) => {
      acc += el.zip_code;
      if (index === data.length - 1) { acc += ')'; }
      return acc;
    }, '(');
    const nearbyUsers = await generateDiscoverFeed(id, matchedZipcodes, count);
    res.status(200).send(nearbyUsers);
  } catch (err) {
    console.log(err);
    res.status(404).send('Unable to retrieve matched users');
  }
};

module.exports = {
  getMatches,
};
