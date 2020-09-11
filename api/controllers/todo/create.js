module.exports = {
  friendlyName: 'Create',

  description: 'Create todo.',

  inputs: {
    task: {
      description: 'The task to be added',
      type: 'string',
      required: true,
    },
  },

  exits: {
    badRequest: {
      description: 'Task could not be created',
      responseType: 'badRequest',
    },
    success: {
      statusCode: 201,
      description: 'Task added successfully',
    },
  },

  fn: async function ({ task }, exits) {
    try {
      const user = this.req.user;
      await sails.models.todo.create({
        task,
        owner: user.id,
      });

      return exits.success({
        status: true,
        message: 'Task added successfully',
      });
    } catch (error) {
      throw 'badRequest';
    }
  },
};
