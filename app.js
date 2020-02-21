if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 

const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const gameServer = require('./bin/spacewars/gameServer');

// start an express app
let app = express();

// set up template engine
app.set('views', './views/pages');
app.set('view engine', 'jade');

// pass through all information,
// this way we can acces it through the req object
app.use(express.urlencoded({ extended: false }))

// user stays logged in accross pages
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false
}));

// flash handles messages between page renders
app.use(flash());

// global vars for sending messages between pages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// use passport to save a logged in user's information
app.use(passport.initialize());

// works with session to keep user logged in during one session
app.use(passport.session());

// host the files in the 'public' folder
app.use(express.static('public'));

// define the routes for / and /game
app.use('/', require('./routes/index'));
app.use('/games', require('./routes/games'));
app.use('/scores', require('./routes/scores'));
app.use('/users', require('./routes/users'));

// get the right port
const PORT = process.env.PORT || 8080;

// start the servers
let server = app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server running and listening on ${PORT}...`);
    gameServer.start(server); // start the server for rocketWars
    require('./models/database'); // start the database
  }
  else console.log(err);
});

