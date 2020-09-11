module.exports = {
  friendlyName: 'Login',

  description: 'Login user.',

  inputs: {
    email: {
      description: 'The email the user wants to sign up with',
      type: 'string',
      required: true,
      isEmail: true,
      unique: true,
    },
    password: {
      description: 'The password the user wants to sign up with',
      type: 'string',
      required: true,
    },
  },

  exits: {
    badRequest: {
      description: 'User could not be created',
      responseType: 'badRequest',
    },
    unauthorized: {
      description: 'User could not login',
      statusCode: 401,
    },
    success: {
      statusCode: 200,
      description: 'User logged in successfully',
    },
  },

  fn: async function ({ email, password }, exits) {
    try {
      // CHECK IF USER EXISTS AND THROW AN ERROR IF THEY DO NOT EXIST
      const user = await User.findOne({
        email,
      });

      if (!user) {
        return exits.unauthorized({
          status: false,
          message: 'Wrong email or password',
        });
      }

      // CHECK IF PASSWORD IS CORRECT
      const validPassword = await sails.helpers.user.validatePassword.with({
        password,
        hashedPassword: user.password,
      });

      if (!validPassword) {
        return exits.unauthorized({
          status: false,
          message: 'Wrong email or password',
        });
      }

      // TOKENIZE USER DETAILS
      const token = await sails.helpers.user.tokenizeUser.with({
        user,
      });

      return exits.success({
        status: true,
        message: 'User signed in successfully',
        data: {
          token,
        },
      });
    } catch (error) {
      throw 'badRequest';
    }
  },
};
