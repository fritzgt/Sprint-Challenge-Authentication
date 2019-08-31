const db = require('../database/dbConfig');

module.exports = {
  findByUser,
  add
};

//for login
function findByUser(user) {
  return db('users')
    .where('username', user)
    .first();
}

//for registration
async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return db('users')
    .where({ id })
    .first();
}
