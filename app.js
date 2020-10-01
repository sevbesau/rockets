const cors = require('cors');
const flash = require('express-flash');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const Session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const initializePassport = require('./bin/passport-config');
const gameServer = require('./bin/spacewars/gameServer');
const database = require('./models/database');

//if (process.env.NODE_ENV !== 'production') {
  //dotenv.config();
//}

process.env.NODE_ENV !== 'production' && dotenv.config();

database.connect();
initializePassport(passport, database.getUserByEmail, database.getUserById);

const session = Session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
});

// start an express app
const app = express();

// set up template engine
app.set('views', './views/pages');
app.set('view engine', 'jade');

// general middlewares
app.use(cors());
app.use(flash());
app.use(morgan('tiny'));
app.use(bodyParser.json()); // TODO needed?
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// login middlewares
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// global vars for sending messages between pages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// TODO refactor to use index.js as entry
// define the routes for / and /game
app.use('/', require('./routes/index'));
app.use('/games', require('./routes/games'));
app.use('/scores', require('./routes/scores'));
app.use('/users', require('./routes/users'));

// start listening
const { PORT } = process.env;
const server = app.listen(PORT, (err) => {
  if (!err) {
    console.log(`[express] Server running and listening on ${PORT}...`);
    gameServer.start(server, session); // start the server for rocketWars
  }
  else console.log(err);
});
