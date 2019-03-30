"use strict";

module.exports = Review => {

  Review.remoteMethod("getMyReview", {
    accepts: [
      {
        arg: "cont",
        type: "object",
        required: true,
        http: ctx => {
          return ctx && ctx.req;
        }
      }
    ],
    returns: {
      arg: "return",
      type: "array",
      root: true
    },
    http: {
      path: "/getMyReview",
      verb: "get"
    }
  });

  Review.getMyReview = async cont => {
    const accessToken = cont.accessToken;
    const userId = accessToken.userId;
    // const review = app.models.Review;
    let myReviews = await new Promise((resolve, reject) => {
      Review.find({ where: { publisherId: userId } }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return myReviews;
  };
};
