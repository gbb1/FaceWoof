/* eslint-disable indent */
/* eslint-disable max-len */
const db = require('../db/database');

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
  db.connect();
  db.query(`

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
  db.query(`
    INSERT INTO pendingRelationships (user1id, user1Choice, user2id)
    VALUES (${user1}, ${choice}, ${user2});
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
  db.query(`
    IF (SELECT user1Choice FROM pendingRelationships WHERE user1id = ${user1} AND user2id = ${user2}) = true
      AND (SELECT user1Choice FROM pendingRelationships WHERE user1id = ${user2} AND user2id = ${user1}) = true
      THEN

      BEGIN
        DELETE FROM pendingRelationships WHERE user1id = ${user1} AND user2id = ${user2};
        DELETE FROM pendingRelationships WHERE user1id = ${user2} AND user1id = ${user2};
        INSERT INTO friends (user1ID, user2ID) VALUES (${user1}, ${user2});
      END;

    ELSE
      RAISE EXCEPTION 'not a match';
    END IF;
  `)
  .then((results) => {
    console.log('checking for match result:', results);
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

generateDiscoverFeed(7, "('10036', '10017', '10029')", 100);
// testQuery();
