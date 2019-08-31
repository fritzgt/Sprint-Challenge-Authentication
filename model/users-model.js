const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {}

function findById(id) {}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return db('users')
    .where({ id })
    .first();
}

function update(changes, id) {}

function remove(id) {}
