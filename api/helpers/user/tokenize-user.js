const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Tokenize user',

  description: 'Tokenizes a user using JWT',

  inputs: {
    user: {
      description: 'The user object',
      type: {
        email: 'string',
        name: 'string',
        id: 'string',
      },
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ user }) {
    const { email, name, id } = user;
    const token = await jwt.sign({ email, name, id }, sails.config.custom.jwtSecret);
    return token;
  },
};
