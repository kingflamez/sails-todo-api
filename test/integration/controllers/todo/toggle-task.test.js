// test/integration/controllers/UserController.test.js
var supertest = require("supertest");
var assert = require("chai").assert;

let token = "";
let task = null;

describe("todo.toggle-task", () => {
  beforeEach(function (done) {
    // Sign up a user, login and store the token so as to be used
    this.timeout(5000);
    const beforeAction = async () => {
      await supertest(sails.hooks.http.app)
        .post("/user/signup")
        .send({ name: "test", password: "test", email: "wole2@email.com" });

      const auth = await supertest(sails.hooks.http.app)
        .post("/user/login")
        .send({ password: "test", email: "wole2@email.com" });

      token = `Bearer ${auth.body.data.token}`;

      await supertest(sails.hooks.http.app)
        .post("/todo")
        .set("Authorization", token)
        .send({ task: "Create awesome work" });

      const taskData = await supertest(sails.hooks.http.app)
        .get("/todo")
        .set("Authorization", token);

      task = taskData.body.data[0];
      done();
    };
    beforeAction();
  });

  it("should toggle a task done status", (done) => {
    supertest(sails.hooks.http.app)
      .post(`/todo/${task.id}/toggle-task`)
      .set("Authorization", token)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.message, "Task is now done");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(error);
      });
  });

  it("should throw 404 if a task does not exist", (done) => {
    supertest(sails.hooks.http.app)
      .post(`/todo/${30}/toggle-task`)
      .set("Authorization", token)
      .expect(404, done);
  });

  it("should throw unauthorized if the token is not passed", (done) => {
    supertest(sails.hooks.http.app)
      .post(`/todo/${task.id}/toggle-task`)
      .expect(401, done);
  });
});
