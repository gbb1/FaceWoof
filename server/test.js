const db = require('./db/database');
const axios = require('axios');
const { generateDiscoverFeed } = require('./controllers/discover');

const test = (user1, zipcodes, count) => {
  return db.connect()
    // .then(() => generateDiscoverFeed((7, "('10036', '10017', '10029')", 100)))
    .then(() => {
      return db.query(`
      SELECT * FROM
      (
        SELECT * FROM users
          WHERE users.location IN ${zipcodes}
            AND "userId" NOT IN
            (
              SELECT friends."user1ID" FROM friends
              WHERE friends."user2ID" = ${user1}
            )
            AND "userId" NOT IN
            (
              SELECT friends."user2ID" FROM friends
              WHERE friends."user1ID" = ${user1}
            )
        ) users
      LEFT JOIN
          (
          SELECT * FROM public."pendingRelationships"
          WHERE "user2Id" = ${user1}
            AND "user1Choice" = true
          ) AS relationships
          ON users."userId" = relationships."user1Id"
      WHERE "userId" NOT IN
        (
          SELECT a."user1Id" FROM public."pendingRelationships" a
          WHERE a."user2Id" = ${user1}
            AND "user1Choice" = false
        )
        AND "userId" NOT IN
        (
          SELECT a."user2Id" FROM public."pendingRelationships" a
          WHERE a."user1Id" = ${user1}
            AND "user1Choice" = false
        )
      ORDER BY relationships."user1Choice"
      LIMIT ${count};
      `)
    })
      .then(res => console.log(res.rows.length))
      .catch(err => console.log(err));
};

const fetchZipcodes = (zipcode, radius) => {
  return axios.get(`https://www.zipcodeapi.com/rest/CZcEcjzH2EFdijkFrJZffw9y6RjJYftAPbnkUs2iQ9g6vNVnFMiSG9JLUyd6wW0v/radius.json/${zipcode}/${radius}/mile`)
};

// test(7, "('10036', '10017', '10029')", 100);
fetchZipcodes(78754, 5)
  .then(res => console.log(res.data))
  .catch(err => console.log(err));