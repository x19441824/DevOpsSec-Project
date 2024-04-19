const request = require('supertest');
const app = require('../server.js');

describe('Server API Tests', () => {
  let chai, expect;

  before(async () => {
    const chaiModule = await import('chai');
    chai = chaiModule.default;
    expect = chaiModule.expect;
  });

  let server;


  before((done) => {
    server = app.listen(4000, () => {
      console.log('Server started for testing.');
      done();
    });
  });

  after((done) => {
    server.close(() => {
      console.log('Server closed for testing.');
      done();
    });
  });

  describe('GET /recipes', () => {
    it('should fetch all recipes', (done) => {
      request(app)
        .get('/recipes')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /search', () => {
    it('should search recipes by a term', (done) => {
      const searchTerm = 'chocolate';
      request(app)
        .get(`/search?query=${searchTerm}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /recipes', () => {
    it('should add a new recipe', (done) => {
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
          expect(res.body.message).to.equal('success');
          done();
        });
    });
  });
});
