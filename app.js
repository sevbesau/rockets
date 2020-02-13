if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

const routes = require('./routes/game');
const login = require('./routes/login');
const gameServer = require('./bin/gameServer');

// start an express app
let app = express();

// start the servers
let server = app.listen(8080);
gameServer.start(server);

// set up template engine
app.set('views', './views');
app.set('view engine', 'jade');

// pass through all information,
// this way we can acces is through the req object
app.use(express.urlencoded({ extended: false }))

// TODO whats flash?
app.use(flash());

// user stays logged in accross pages
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false
}));

// TODO what is passport?
app.use(passport.initialize());

// works with session to keep user logged in during one session
app.use(passport.session());

// host the files in the 'public' folder
app.use(express.static('public'));

// define the routes for / and /game
app.use('/', login);
app.use('/game', routes);



console.log("Server running...");