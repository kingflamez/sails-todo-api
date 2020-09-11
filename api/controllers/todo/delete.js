module.exports = {
  friendlyName: 'Delete',

  description: 'Delete todo.',

  inputs: {
    id: {
      description: 'The task id',
      type: 'string',
      required: true,
    },
  },

  exits: {
    badRequest: {
      description: 'Task could not be deleted',
      responseType: 'badRequest',
    },
    notFound: {
      statusCode: 404,
      description: 'Task does not exist',
    },
    success: {
      statusCode: 200,
      description: 'Task deleted successfully',
    },
  },

  fn: async function ({ id }, exits) {
    try {
      const user = this.req.user;
      const task = await sails.models.todo.findOne({ id, owner: user.id });
      if (!task) {
        return exits.notFound({
          status: false,
          message: 'Task does not exist',
        });
      }

      await sails.models.todo.destroy({
        id,
      });

      return exits.success({
        status: true,
        message: `Task is now deleted`,
      });
    } catch (error) {
      throw 'badRequest';
    }
  },
};
