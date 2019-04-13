const app = require('../../server/server');

module.exports = (UserService) => {
  const Userservices = UserService;
  Userservices.remoteMethod('createUser', {
    accepts: [{
        arg: 'params',
        type: 'object',
        required: true,
      },
      {
        arg: 'cont',
        type: 'object',
        required: true,
        http: ctx => ctx && ctx.req,
      },
    ],
    returns: {
      arg: 'return',
      type: 'object',
      root: true,
    },
    http: {
      path: '/createUser',
      verb: 'post',
    },
  });

  Userservices.createUser = async (params) => {
    const reviewer = app.models.Reviewer;
    const newuser = await new Promise((res, rej) => {
      reviewer.create(params, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };
};
