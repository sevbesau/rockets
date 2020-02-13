if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

const routes = require('./routes/game');
const login = require('./routes/users');
const gameServer = require('./bin/gameServer');

// start an express app
let app = express();

// get the right port
const PORT = process.env.PORT || 8080;

// start the servers
let server = app.listen(PORT);
gameServer.start(server);

console.log(`Server running and listening on ${PORT}...`);

// set up template engine
app.set('views', './views');
app.set('view engine', 'jade');

// pass through all information,
// this way we can acces is through the req object
app.use(express.urlencoded({ extended: false }))

// flash handles form error messages 
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
app.use('/users', routes);



