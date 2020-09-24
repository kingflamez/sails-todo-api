// test/integration/controllers/UserController.test.js
var supertest = require('supertest');
var should = require('chai').should();

let token = '';
let task = null;

describe('todo.list', () => {
  before(function (done) {
    // Sign up a user, login and store the token so as to be used
    this.timeout(5000);
    const beforeAction = async () => {
      await supertest(sails.hooks.http.app)
        .post('/user/signup')
        .send({ name: 'test', password: 'test', email: 'wole2@email.com' });

      const auth = await supertest(sails.hooks.http.app)
        .post('/user/login')
        .send({ password: 'test', email: 'wole2@email.com' });

      token = `Bearer ${auth.body.data.token}`;

      await supertest(sails.hooks.http.app)
        .post('/todo')
        .set('Authorization', token)
        .send({ task: 'Create awesome work' });

      const taskData = await supertest(sails.hooks.http.app)
        .get('/todo')
        .set('Authorization', token);

      task = taskData.body.data[0];
      done();
    };
    beforeAction();
  });

  it('should get list of tasks', (done) => {
    supertest(sails.hooks.http.app)
      .get(`/todo`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        response.body.data.should.be.an('array');
        done();
      });
  });

  it('should throw unauthorized if the token is not passed', (done) => {
    supertest(sails.hooks.http.app).get(`/todo`).expect(401, done);
  });
});
