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
  it('Test if is creating new users', async () => {
    let newUser = await users.add({ username: 'Kristen', password: '1234' });
    expect(newUser.username).toBe('Kristen');
    newUser = await users.add({ username: 'sasha', password: '1234' });
    expect(newUser.username).toBe('sasha');
  });
});

//CHECK LOGIN
describe('POST / login', () => {
  //clear entries in db before test
  beforeEach(async () => {
    await db('users').truncate();
  });
  //check if the  findByUser reuest return correct user
  it('Should return username', async () => {
    await users.add({ username: 'Kristen', password: '1234' });
    const res = await users.findByUser('Kristen');
    expect(res.username).toBe('Kristen');
  });

  //test for format json, XML
  it('Should return json', async () => {
    const res = await request(server).post('/api/auth/login');
    expect(res.type).toBe('application/json');
  });
});
