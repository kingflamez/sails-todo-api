/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //USER
  'POST /user/login': { action: 'user/login' },
  'POST /user/signup': { action: 'user/signup' },

  //TODO
  'POST /todo': { action: 'todo/create' },
  'GET /todo': { action: 'todo/list' },
  'GET /todo/:id': { action: 'todo/get' },
  'PATCH /todo/:id': { action: 'todo/update' },
  'DELETE /todo/:id': { action: 'todo/delete' },
  'POST /todo/:id/toggle-task': { action: 'todo/toggle-task' },
};
