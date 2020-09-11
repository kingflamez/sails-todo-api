module.exports = {
  friendlyName: 'List',

  description: 'List todo.',

  exits: {
    badRequest: {
      description: 'Task could not be fetched',
      responseType: 'badRequest',
    },
    success: {
      statusCode: 200,
      description: 'Task fetched successfully',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const user = this.req.user;
      const todos = await sails.models.todo.find({
        where: {
          owner: user.id,
        },
        select: ['id', 'task', 'done'],
      });

      return exits.success({
        status: true,
        message: 'Task fetched successfully',
        data: todos,
      });
    } catch (error) {
      throw 'badRequest';
    }
  },
};
