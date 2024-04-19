
const request = require('supertest');
const app = require('../server');


describe('GET /recipes', () => {
  it('should fetch all recipes', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

});
