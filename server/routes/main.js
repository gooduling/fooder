exports.setup = function (app) {
  app.get('/', function(req, res) {
      //SPA entry point.
      console.log('/index.html');
      res.render('index.html');
  });
};