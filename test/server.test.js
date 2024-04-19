const request = require('supertest');
const { app, closeDatabase } = require('../server.js');

describe('Server API Tests', () => {
  let server;

  // Start the server before any tests run with a timeout
  beforeAll(done => {
    server = app.listen(4000, () => {
      console.log('Server started for testing.');
      done();
    });
  }, 10000); // Timeout set to 10 seconds

  // Close the server and database after the tests are done with a timeout
  afterAll(done => {
    // Close the server first
    server.close(async (err) => {
      if (err) {
        console.error('Failed to close the server:', err);
        done(err);
      } else {
        console.log('Server closed for testing.');
        // Then close the database if it's open
        try {
          await closeDatabase();
          console.log('Database connection closed.');
          done();
        } catch (dbErr) {
          console.error('Failed to close the database connection:', dbErr);
          done(dbErr);
        }
      }
    });
  }, 10000); // Timeout set to 10 seconds

  // Each test also has its own timeout
  test('GET /recipes should fetch all recipes', (done) => {
    request(app)
      .get('/recipes')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).toBeInstanceOf(Array);
        done();
      });
  }, 10000); // Timeout set to 10 seconds

  test('GET /search should search recipes by a term', (done) => {
    const searchTerm = 'chocolate';
    request(app)
      .get(`/search?query=${searchTerm}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  }, 10000); // Timeout set to 10 seconds

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
  }, 10000); // Timeout set to 10 seconds
});
