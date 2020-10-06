const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    // look up the user
    const user = await getUserByUsername(username);
    if (user == null) {
      return done(null, false, { message: 'No user with that username' });
    }
    try {
      // check if the password is correct
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Password incorrect' });
    } catch (err) {
      return done(err);
    }
  };

  // use a local login system, dont use fb, google, etc..
  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    authenticateUser,
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    const getUser = async (id) => {
      const user = await getUserById(id);
      done(null, user);
    };
    getUser(id);
  });
}

module.exports = initialize;
