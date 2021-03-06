'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line

var BasicStrategy = strategy.BasicStrategy;
var server = express();

// resolves cache problem that caused 304 error code
server.disable('etag');

server.use(passport.initialize());

server.use(function(req, res, next) {
  console.log('incoming request');
  console.log(req.originalUrl);
  next();
});

passport.use(new BasicStrategy(
	function(username, password, done) {
    if (username.valueOf() === 'test' &&
      password.valueOf() === 'logmein')
      return done(null, true);
    else
      return done(null, false);
  }
));

server.get('/hello', function(req, res) {
  res.status(200);

  res.set({
    'Content-Type': 'text/plain'
  });
	res.send('accessible to everyone');
});

server.get('/*', passport.authenticate('basic', { session: false }), function(req, res) {
	res.status(200);

	res.set({
    'Content-Type': 'text/plain'
  });
  res.send('only accessible when logged in');

});

server.listen(process.env.PORT || 8080);
// create an express server just like in the first exercise
// as shown in the examples, you are asked to implement authentication check
// the authentication check will only grant the user "test" with the password "logmein" acces
// use the passport middleware with the basic strategy from passport-http to solve this exercise
// note that since we are using the basic strategy, there is no need for a session
// should the server restart, a user that already authenticated will thus not need to login

// examples which serve as a specification for the required features:
//   http://localhost:8080/hello should return 'accessible to everyone' in plain text
//   http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password
//   http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password
