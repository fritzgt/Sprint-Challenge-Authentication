//importing supertest
const request = require('supertest');

//importing server
// const server = require('../api/server');
const db = require('../database/dbConfig');
// const users = require('../model/user-model.js');

//check if evirement is set to testing
describe('server.js', () => {
  it('Should set the environment testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});
