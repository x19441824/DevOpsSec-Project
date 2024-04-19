const request = require('supertest');
const app = require('../server.js');

describe('Server API Tests', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4000, () => {
      console.log('Server started for testing.');
      done();
    });
  });

  afterAll((done) => {
    if (server) {
      server.close(() => {
        console.log('Server closed for testing.');
        done();
      });
    } else {
      console.log('No server to close.');
      done();
    }
  });

  test('GET /recipes should fetch all recipes', (done) => {
    request(app)
      .get('/recipes')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).toBeInstanceOf(Array);
        done();
      });
  });

  test('GET /search should search recipes by a term', (done) => {
    const searchTerm = 'chocolate';
    request(app)
      .get(`/search?query=${searchTerm}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  test('POST /recipes should add a new recipe', (done) => {
    const newRecipe = {
      title: 'New Recipe',
      description: 'Description of the new recipe',
      ingredients: 'Ingredients of the new recipe',
      preparation_time: 30,
      difficulty: 'easy'
    };

    request(app)
      .post('/recipes')
      .send(newRecipe)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe('success');
        done();
      });
  });
});
