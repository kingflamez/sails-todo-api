// test/integration/controllers/UserController.test.js
var supertest = require("supertest");

describe("user.login", () => {
  before(function (done) {
    // Sign up a user so as to use as login
    this.timeout(5000);
    supertest(sails.hooks.http.app)
      .post("/user/signup")
      .send({ name: "test", password: "test", email: "wole2@email.com" })
      .then(() => {
        done();
      });
  });

  it("should return 200 status when successful", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/login")
      .send({ password: "test", email: "wole2@email.com" })
      .expect(200, done);
  });

  it("should throw 400 bad request if the email is invalid", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/login")
      .send({ password: "test", email: "flamez" })
      .expect(400, done);
  });

  it("should throw 401 if the password is incorrect", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/login")
      .send({ password: "testing", email: "wole2@email.com" })
      .expect(401, done);
  });

  it("should throw 401 if the email is incorrect", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/login")
      .send({ password: "test", email: "wole23@email.com" })
      .expect(401, done);
  });
});
