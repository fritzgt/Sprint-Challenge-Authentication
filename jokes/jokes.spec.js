//importing supertest
const request = require('supertest');

//importing server
const server = require('../api/server');

describe('Test /jokes', () => {
  it('Should return json', async () => {
    const res = await request(server).get('/api/jokes');
    expect(res.type).toEqual('application/json');
  });

  //check for error when not providing creds
  it('Should return 401 missing token', async () => {
    const res = await request(server).get('/api/jokes');
    expect(res.status).toBe(401);
  });
});
