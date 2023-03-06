const axios = require('axios');
require('dotenv').config();
const {
  generateDiscoverFeed,
} = require('../db');

const apiKey = process.env.ZIPCODE_APIKEY;
const url = process.env.ZIPCODE_URI;

const discoverUsers = async (req, res) => {
  try {
    const {
      id, zipcode, radius, count,
    } = req.query;
    const { data } = await axios.get(`${url}/${apiKey}/radius.json/${zipcode}/${radius}/mile`);
    const matchedZipcodes = data.zip_codes.reduce((acc, el, index) => {
      acc += `'${el.zip_code}', `;
      if (index === data.zip_codes.length - 1) {
        acc = acc.slice(0, -2) + ')';
      }
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
  discoverUsers,
};
