'use strict';

module.exports = Review => {
  Review.remoteMethod('getMyReview', {
    accepts: [
      {
        arg: 'cont',
        type: 'object',
        required: true,
        http: ctx => {
          return ctx && ctx.req;
        },
      },
    ],
    returns: {
      arg: 'return',
      type: 'object',
      root: true,
    },
    http: {
      path: '/getMyReview',
      verb: 'get',
    },
  });

  Review.getMyReview = async cont => {
    const accessToken = await cont.accessToken;
    const userId = accessToken.userId;
    return userId;
  };
};
