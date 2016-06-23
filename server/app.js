require('dotenv').load();

var express = require('express'),
    expressSession = require('express-session'),
  routes = require('./routes'),
  bodyParser = require('body-parser'),
  error = require('./lib/middleware/errorHandler'),
  app = express(),
  auth = require('./lib/auth'),
  morgan = require('morgan');

require('./lib/db.connector');
app.use(morgan('combined'));
app.use(express.static('client'));
app.use(bodyParser.json());
app.use(expressSession({secret: "just don't give a", resave: true, saveUninitialized: true}));

//app.use(require('cookie-parser')());
//app.use(bodyParser.urlencoded({extended: true}));

auth.setup(app);
routes.setup(app);
app.use(error());

// //serve static files for login user
app.set('views', __dirname + '/../client');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(process.env.SERVER_PORT, function(err) {
  err ? console.log('Something happened ', err)
    : console.log('Server is listening on %d', process.env.SERVER_PORT);
});

process.on('uncaughtException', function(err) {
  // graceful exit and error handling
  console.log('Uncaught error: ', err.message);
  process.exit(1);
});
