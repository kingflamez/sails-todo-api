const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Decode user',

  description: 'Decode a user from Token',

  inputs: {
    token: {
      description: 'The user object',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ token }) {
    let mainToken = token.replace('Bearer ', '');
    const user = await jwt.verify(mainToken, sails.config.custom.jwtSecret);
    return user;
  },
};
