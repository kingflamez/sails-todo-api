const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Hash password',

  description: 'Hashes users password',

  inputs: {
    password: {
      description: 'The password to be hashed',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ password }) {
    return bcrypt.hash(password, sails.config.custom.saltRounds);
  },
};
