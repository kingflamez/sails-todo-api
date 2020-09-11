module.exports = {
  friendlyName: 'Signup',

  description: 'Signup user.',

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
    name: {
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
    conflict: {
      statusCode: 409,
      description: 'When a user exists before',
    },
    success: {
      statusCode: 201,
      description: 'User created successfully',
    },
  },

  fn: async function ({ email, password, name }, exits) {
    try {
      // HASH USER PASSWORD
      const hashedPassword = await sails.helpers.user.hashPassword.with({
        password,
      });

      // CHECK IF USER EXISTS AND THROW AN ERROR IF THEY EXIST
      const userExists = await User.findOne({
        email,
      });

      if (userExists) {
        return exits.conflict({
          status: false,
          message: 'User exists',
        });
      }

      // ADD USER TO DATABASE
      await User.create({
        email,
        name,
        password: hashedPassword,
      });

      return exits.success({
        status: true,
        message: 'User added successfully'
      });
    } catch (error) {
      throw 'badRequest';
    }
  },
};
