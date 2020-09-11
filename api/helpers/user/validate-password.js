const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Compare password',

  description: '',

  inputs: {
    password: {
      description: 'The password to be compared',
      type: 'string',
      required: true,
    },
    hashedPassword: {
      description: 'The hashed password from the database',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ hashedPassword, password }) {
    return bcrypt.compare(password, hashedPassword);
  },
};
