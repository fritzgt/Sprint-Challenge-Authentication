const db = require('../database/dbConfig');

module.exports = {
  find,
  findByUser,
  add,
  update,
  remove
};

function find() {}

function findByUser(user) {
  return db('users')
    .where('username', user)
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return db('users')
    .where({ id })
    .first();
}

function update(changes, id) {}

function remove(id) {}
