module.exports = (Review) => {
  const Reviews = Review;
  Reviews.remoteMethod('getMyReview', {
    accepts: [{
      arg: 'cont',
      type: 'object',
      required: true,
      http: ctx => ctx && ctx.req,
    }],
    returns: {
      arg: 'return',
      type: 'array',
      root: true,
    },
    http: {
      path: '/getMyReview',
      verb: 'get',
    },
  });

  Reviews.getMyReview = async (cont) => {
    const {
      accessToken,
    } = cont;
    const {
      userId,
    } = accessToken;
    // const review = app.models.Review;
    await new Promise((resolve, reject) => {
      Review.find({
        where: {
          publisherId: userId,
        },
      }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
};
