'use strict';

module.exports = Coffeeshop => {
  Coffeeshop.remoteMethod('status', {
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
    http: {
      path: '/status',
      verb: 'get',
    },
    returns: {
      arg: 'status',
      type: 'string',
    },
  });

  Coffeeshop.status = (cont, cb) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const OPEN_HOUR = 6;
    const CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    let response;
    if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };

  Coffeeshop.getName = (shopId, cb) => {
    Coffeeshop.findById(shopId, (err, instance) => {
      let response;
      try {
        response = 'Name of coffee shop is ' + instance.name;
        cb(null, response);
        // console.log(response);
      } catch (err) {
        response = 'Not Found';
        cb(response);
        // console.log('error bro');
      }
    });
  };

  Coffeeshop.remoteMethod('getName', {
    http: {
      path: '/getname',
      verb: 'get',
    },
    accepts: {
      arg: 'id',
      type: 'number',
      http: {
        source: 'query',
      },
    },
    returns: {
      arg: 'name',
      type: 'string',
    },
  });
};
