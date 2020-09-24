// test/integration/controllers/UserController.test.js
var supertest = require('supertest');

describe('user.signup', () => {
  it('should return 201 status when successful', (done) => {
    supertest(sails.hooks.http.app)
      .post('/user/signup')
      .send({ name: 'test', password: 'test', email: 'wole@email.com' })
      .expect(201, done);
  });

  it('should throw 400 bad request if the email is invalid', (done) => {
    supertest(sails.hooks.http.app)
      .post('/user/signup')
      .send({ name: 'test', password: 'test', email: 'flamez' })
      .expect(400, done);
  });

  it('should throw a conflict if the email exists', (done) => {
    supertest(sails.hooks.http.app)
      .post('/user/signup')
      .send({ name: 'test', password: 'test', email: 'wole@email.com' })
      .expect(409, done);
  });
});
