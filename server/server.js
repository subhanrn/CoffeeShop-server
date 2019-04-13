const loopback = require('loopback');
const boot = require('loopback-boot');

// eslint-disable-next-line no-multi-assign
const app = module.exports = loopback();

app.start = () => {
  // start the web server
  const port = process.env.PORT || 3000;
  return app.listen(port, () => {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.use(loopback.token({
      model: app.models.AccessToken,
    }));
    app.use((req, res, next) => {
      const token = req.accessToken;

      if (!token) {
        return next();
      }

      const now = new Date();
      if (now.getTime() - token.created.getTime() < 1000) {
        return next();
      }

      req.accessToken.created = now; // eslint-disable-line
      return req.accessToken.save(next);
    });
    app.start();
  }
});
