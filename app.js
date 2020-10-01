const dotenv = require('dotenv');
const express = require('express');
const flash = require('express-flash');
const Session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const gameServer = require('./bin/spacewars/gameServer');
const initializePassport = require('./bin/passport-config');
const database = require('./models/database');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

database.connect();

// start an express app
const app = express();

// set up template engine
app.set('views', './views/pages');
app.set('view engine', 'jade');

app.use(cors());
// pass through all information,
// this way we can acces it through the req object
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(bodyParser.json());

const session = Session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
});
// user stays logged in accross pages
app.use(session);

// flash handles messages between page renders
app.use(flash());

// global vars for sending messages between pages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// set up passport
initializePassport(passport, database.getUserByEmail, database.getUserById);

// use passport to save a logged in user's information
app.use(passport.initialize());

// works with session to keep user logged in during one session
app.use(passport.session());

// host the files in the 'public' folder
app.use(express.static('public'));

// define the routes for / and /game
app.use('/', require('./routes/index'));
app.use('/games', require('./routes/games'));
//app.use('/scores', require('./routes/scores'));
app.use('/users', require('./routes/users'));

// get the right port
const { PORT } = process.env;

// start the servers
const server = app.listen(PORT, (err) => {
  if (!err) {
    console.log(`[express] Server running and listening on ${PORT}...`);

    gameServer.start(server); // start the server for rocketWars
  }
  else console.log(err);
});
