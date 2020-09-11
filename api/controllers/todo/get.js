module.exports = {
  friendlyName: 'Get',

  description: 'Get todo.',

  inputs: {
    id: {
      description: 'The task id',
      type: 'string',
      required: true,
    },
  },

  exits: {
    badRequest: {
      description: 'Task could not be fetched',
      responseType: 'badRequest',
    },
    notFound: {
      statusCode: 404,
      description: 'Task does not exist',
    },
    success: {
      statusCode: 200,
      description: 'Task fetched successfully',
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

      return exits.success({
        status: true,
        message: `Task fetched successfully`,
        data: {
          id: task.id,
          task: task.task,
          done: task.done
        },
      });
    } catch (error) {
      throw 'badRequest';
    }
  },
};
