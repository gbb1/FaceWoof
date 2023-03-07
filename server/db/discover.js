/* eslint-disable indent */
/* eslint-disable max-len */
const db = require('./database');

// QUERIES

/* GET X POTENTIAL MATCHES AND SERVE UP A SORTED LIST */
/* OUT: array of users within set mile radius, ideally, first to appear are users who have already said yes to primary user */
function testQuery() {
  console.log('here');
  db.query(`
    SELECT * FROM users;
  `)
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });
}

function generateDiscoverFeed(user1, zipcodes, count) {
  return db.query(`
  SELECT users."userId", users."dogName", users."ownerName", users."dogBreed", users."age", users."vaccination", users."discoverable", users."ownerEmail", users."location", relationships."user1Choice" FROM
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
  .then((results) => {
    console.log('Discover feed results', results.rows, results.rows.length);
    return results.rows;
  })
  .catch((err) => {
    console.log('Error querying for discover feed', err);
  });
}

/* SET A USER'S RESPONSE TO A DIFFERENT USER TO THEIR CHOICE */
function setRelationship(user1, user2, choice) {
  let date = new Date();
  date = Math.floor(date.getTime() / 1000);

  db.query(`
    INSERT INTO public."pendingRelationships" ("user1Id", "user1Choice", "user2Id", "date")
    VALUES (${user1}, ${choice}, ${user2}, to_timestamp(${date}));
  `)
    .then((result) => {
      console.log('🚀 setRelationships query result:', result);
      return result;
    })
    .catch((err) => {
      console.log('Error setting relationships:', err);
    });
}

/* DETECT IF MATCH, IF SO, CREATE FRIENDSHIP BETWEEN USER 1 AND USER 2 */
function checkForMatchAndCreate(user1, user2) {
  let date = new Date();
  date = Math.floor(date.getTime() / 1000);

  return db.query(`
    do $$
    BEGIN
      DELETE FROM public."pendingRelationships" WHERE "user1Id" = ${user2} AND "user2Id" = ${user1};
      INSERT INTO friends ("user1ID", "user2ID", "date") VALUES (${user1}, ${user2}, to_timestamp(${date}));
    END
    $$
  `)
  .then((results) => {
    console.log('checking for match result:', results, true);
    return true;
  })
  .catch((err) => {
    console.log('not a match:', err);
    return false;
  });
}

module.exports = {
  setRelationship,
  checkForMatchAndCreate,
  generateDiscoverFeed,
};

// generateDiscoverFeed(7, "('10036', '10017', '10029')", 100);
