module.exports = (CoffeeService) => {
  const CoffeeServices = CoffeeService;


  CoffeeServices.remoteMethod('findAllCoffeeShop', {
    accepts: [],
    returns: {
      arg: 'return',
      type: 'Object',
      root: false,
    },
    http: {
      path: '/findAllCoffeeShop',
      verb: 'get',
    },
  });

  CoffeeServices.findAllCoffeeShop = () => {
    const coffeeShopModel = CoffeeServices.app.models.CoffeeShop;
    return new Promise((res, rej) => {
      coffeeShopModel.find(null, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };


  CoffeeServices.remoteMethod('findByIdCoffeeShop', {
    accepts: [{
      arg: 'id',
      type: 'String',
      required: true,
    }],
    returns: {
      arg: 'return',
      type: 'Object',
      root: false,
    },
    http: {
      path: '/findByIdCoffeeShop',
      verb: 'get',
    },
  });

  CoffeeServices.findByIdCoffeeShop = (id) => {
    const coffeeShopModel = CoffeeServices.app.models.CoffeeShop;
    return new Promise((res, rej) => {
      coffeeShopModel.find({
        where: {
          id,
        },
      }, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };


  CoffeeServices.remoteMethod('createCoffeeShop', {
    accepts: [{
      arg: 'params',
      type: 'Object',
      required: true,
      http: {
        source: 'body',
      },
    }],
    returns: {
      arg: 'return',
      type: 'Object',
      root: false,
    },
    http: {
      path: '/createCoffeeShop',
      verb: 'post',
    },
  });

  CoffeeServices.createCoffeeShop = (params) => {
    const coffeeShopModel = CoffeeServices.app.models.CoffeeShop;
    return new Promise((res, rej) => {
      coffeeShopModel.create(params, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };

  CoffeeServices.remoteMethod('updateByIdCoffeeShop', {
    accepts: [{
      arg: 'params',
      type: 'Object',
      required: true,
      http: {
        source: 'body',
      },
    }],
    returns: {
      arg: 'return',
      type: 'Object',
      root: false,
    },
    http: {
      path: '/updateByIdCoffeeShop',
      verb: 'post',
    },
  });

  CoffeeServices.updateByIdCoffeeShop = (params) => {
    const coffeeShopModel = CoffeeServices.app.models.CoffeeShop;
    return new Promise((res, rej) => {
      coffeeShopModel.replaceById(params.id, {
        name: params.name,
        city: params.city,
      }, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };


  CoffeeServices.remoteMethod('deleteByIdCoffeeShop', {
    accepts: [{
      arg: 'id',
      type: 'String',
      required: true,
    }],
    returns: {
      arg: 'return',
      type: 'Object',
      root: false,
    },
    http: {
      path: '/deleteByIdCoffeeShop',
      verb: 'get',
    },
  });

  CoffeeServices.deleteByIdCoffeeShop = (id) => {
    const coffeeShopModel = CoffeeServices.app.models.CoffeeShop;
    return new Promise((res, rej) => {
      coffeeShopModel.destroyById(id, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };


  CoffeeServices.remoteMethod('findAllReview', {
    accepts: [],
    returns: {
      arg: 'return',
      type: 'Object',
      root: false,
    },
    http: {
      path: '/findAllReview',
      verb: 'get',
    },
  });

  CoffeeServices.findAllReview = () => {
    const reviewModel = CoffeeServices.app.models.Review;
    return new Promise((res, rej) => {
      reviewModel.find({
        include: ['coffeeShop', 'reviewer'],
      }, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };

  CoffeeServices.remoteMethod('upsertWithWhereReview', {
    accepts: [{
      arg: 'params',
      type: 'Object',
      required: true,
      http: {
        source: 'body',
      },
    }],
    returns: {
      arg: 'return',
      type: 'Object',
      root: false,
    },
    http: {
      path: '/upsertWithWhereReview',
      verb: 'post',
    },
  });

  CoffeeServices.upsertWithWhereReview = (params) => {
    const reviewModel = CoffeeServices.app.models.Review;
    return new Promise((res, rej) => {
      reviewModel.upsertWithWhere({
        coffeeShopId: params.coffeeShopId,
        publisherId: params.publisherId,
      }, {
        date: Date.now(),
        rating: params.rating,
        comments: params.comments,
        coffeeShopId: params.coffeeShopId,
        publisherId: params.publisherId,
      }, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  };


  CoffeeServices.remoteMethod('getMyReview', {
    accepts: [{
      arg: 'cont',
      type: 'Object',
      required: true,
      http: ctx => ctx && ctx.req,
    }],
    returns: {
      arg: 'return',
      type: 'Object',
      root: false,
    },
    http: {
      path: '/getMyReview',
      verb: 'get',
    },
  });

  CoffeeServices.getMyReview = (cont) => {
    const {
      accessToken,
    } = cont;
    const {
      userId,
    } = accessToken;
    const reviewModel = CoffeeServices.app.models.Review;
    return new Promise((resolve, reject) => {
      reviewModel.find({
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
