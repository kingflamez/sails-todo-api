// test/integration/controllers/UserController.test.js
var supertest = require("supertest");

let token = "";
let task = null;

describe("todo.update", () => {
  before(function (done) {
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

  it("should update a task", (done) => {
    supertest(sails.hooks.http.app)
      .patch(`/todo/${task.id}`)
      .send({ task: "Create awesome work" })
      .set("Authorization", token)
      .expect(200, done);
  });

  it("should throw 404 if a task does not exist", (done) => {
    supertest(sails.hooks.http.app)
      .patch(`/todo/${30}`)
      .send({ task: "Create an awesome work" })
      .set("Authorization", token)
      .expect(404, done);
  });

  it("should throw unauthorized if the token is not passed", (done) => {
    supertest(sails.hooks.http.app).patch(`/todo/${task.id}`).expect(401, done);
  });

  it("should throw 400 error if the task is not included", (done) => {
    supertest(sails.hooks.http.app)
      .patch(`/todo/${task.id}`)
      .set("Authorization", token)
      .expect(400, done);
  });
});
