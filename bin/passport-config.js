const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    // look up the user
    const user = await getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
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
      usernameField: 'email',
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
