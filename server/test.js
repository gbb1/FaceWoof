const db = require('./db/database');

const test = () => {
  return db
    .connect()
    .then(() => db.query('SELECT *  FROM public."pendingRelationships" LIMIT 10'))
    .then(res => console.log(res.rows))
    .catch(err => console.log(err));
};

test();
