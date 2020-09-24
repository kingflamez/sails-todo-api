module.exports = {
  friendlyName: 'Update',

  description: 'Update todo.',

  inputs: {
    task: {
      description: 'The task to replace the current task',
      type: 'string',
      required: true,
    },
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

  fn: async function ({ task, id }, exits) {
    try {
      const user = this.req.user;
      const taskExist = await sails.models.todo.findOne({ id, owner: user.id });
      if (!taskExist) {
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
          task,
        });

      return exits.success({
        status: true,
        message: 'Task updated successfully',
      });
    } catch (error) {
      throw 'badRequest';
    }
  },
};
