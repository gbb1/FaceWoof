const db = require('./database');
const {
  setRelationship,
  checkForMatchAndCreate,
  generateDiscoverFeed,
} = require('./discover');

module.exports = {
  db,
  setRelationship,
  checkForMatchAndCreate,
  generateDiscoverFeed,
};
