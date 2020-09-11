module.exports = {
  friendlyName: 'Toggle task',

  description: 'Toggle your todo task',

  inputs: {
    id: {
      description: 'The task id',
      type: 'string',
      required: true,
    },
  },

  exits: {
    badRequest: {
      description: 'Task could not be updated',
      responseType: 'badRequest',
    },
    notFound: {
      statusCode: 404,
      description: 'Task does not exist',
    },
    success: {
      statusCode: 200,
      description: 'Task updated successfully',
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

      await sails.models.todo
        .update({
          id,
        })
        .set({
          done: !task.done,
        });

      return exits.success({
        status: true,
        message: `Task is now ${task.done ? 'undone' : 'done'}`,
      });
    } catch (error) {
      throw 'badRequest';
    }
  },
};
