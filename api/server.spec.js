const express = require('express');
const app = express();

//importing supertest
const request = require('supertest');

//importing server
const server = require('../api/server');
const db = require('../database/dbConfig');
const users = require('../model/users-model.js');

//check if evirement is set to testing
describe('server.js', () => {
  it('Should set the environment testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

//CHECK USER REGISTRATION
describe('POST /', () => {
  //clear entries in db before test
  beforeEach(async () => {
    await db('users').truncate();
  });
  //check if the insert request is working
  it('Should return 3 users', async () => {
    await users.add({ username: 'Kristen', password: '1234' });
    await users.add({ username: 'sasha', password: '1234' });
    const Users = await db('users');
    expect(Users).toHaveLength(2);
  });
  //checks if the insert comes from this and not for existing data
  it('Should return 3 users', async () => {
    let newUser = await users.add({ username: 'Kristen', password: '1234' });
    expect(newUser.username).toBe('Kristen');
    newUser = await users.add({ username: 'sasha', password: '1234' });
    expect(newUser.username).toBe('sasha');
  });
});

//CHECK LOGIN
describe('POST /users', function() {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('responds with json', async () => {});
});
