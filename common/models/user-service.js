module.exports = UserService => {
  const Userservices = UserService;

  Userservices.remoteMethod("createUser", {
    accepts: [
      {
        arg: "params",
        type: "Object",
        required: true,
        http: {
          source: "body"
        }
      }
    ],
    returns: {
      arg: "return",
      type: "Object",
      root: false
    },
    http: {
      path: "/createUser",
      verb: "post"
    }
  });

  Userservices.createUser = params => {
    const reviewerModel = Userservices.app.models.Reviewer;
    return new Promise((res, rej) => {
      reviewerModel.create(params, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };

  Userservices.remoteMethod("signIn", {
    accepts: [
      {
        arg: "params",
        type: "Object",
        required: true,
        http: {
          source: "body"
        }
      }
    ],
    returns: {
      arg: "return",
      type: "Object",
      root: false
    },
    http: {
      path: "/signIn",
      verb: "post"
    }
  });

  Userservices.signIn = params => {
    const reviewerModel = Userservices.app.models.Reviewer;
    return new Promise((res, rej) => {
      reviewerModel.login(params, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };

  Userservices.remoteMethod("signOut", {
    accepts: [
      {
        arg: "cont",
        type: "Object",
        required: true,
        http: ctx => ctx && ctx.req
      }
    ],
    returns: {
      arg: "return",
      type: "Object",
      root: false
    },
    http: {
      path: "/signOut",
      verb: "post"
    }
  });

  Userservices.signOut = cont => {
    const accessTokenModel = Userservices.app.models.AccessToken;
    const { accessToken } = cont;
    if (accessToken == null) {
      throw new Error("invalid token");
    } else {
      return new Promise((res, rej) => {
        accessTokenModel.destroyById(accessToken.id, (err, result) => {
          if (err) {
            rej(err);
          } else {
            res(result);
          }
        });
      });
    }
  };
};
