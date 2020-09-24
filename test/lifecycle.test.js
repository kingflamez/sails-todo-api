var sails = require("sails");

// Before running any tests...
before(function (done) {
  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift(
    {
      log: { level: "warn" },
      datastores: {
        default: {
          adapter: "sails-mysql",
          url: "mysql://root:@127.0.0.1:3306/todo-test",
        },
      },
      models: {
        migrate: "drop",
      },
    },
    (err) => {
      if (err) {
        return done(err);
      }
      return done();
    }
  );
});

// After all tests have finished...
after((done) => {
  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);
});
