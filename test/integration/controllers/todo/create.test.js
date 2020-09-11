// test/integration/controllers/UserController.test.js
var supertest = require("supertest");

let token = "";

describe("todo.create", () => {
  before(function (done) {
    // Sign up a user, login and store the token so as to be used
    this.timeout(5000);
    supertest(sails.hooks.http.app)
      .post("/user/signup")
      .send({ name: "test", password: "test", email: "wole2@email.com" })
      .then(() => {
        supertest(sails.hooks.http.app)
          .post("/user/login")
          .send({ password: "test", email: "wole2@email.com" })
          .then(({ body }) => {
            token = `Bearer ${body.data.token}`;
            done();
          });
      });
  });
  
  it("should create a task", (done) => {
    supertest(sails.hooks.http.app)
      .post("/todo")
      .set("Authorization", token)
      .send({ task: "Create awesome work" })
      .expect(201, done);
  });

  it("should throw a 400 bad request if the task is not present", (done) => {
    supertest(sails.hooks.http.app)
      .post("/todo")
      .set("Authorization", token)
      // .send({ task: "Create awesome work" })
      .expect(400, done);
  });

  it("should throw unauthorized if the token is not passed", (done) => {
    supertest(sails.hooks.http.app)
      .post("/todo")
      .send({ task: "Create awesome work" })
      .expect(401, done);
  });
});
