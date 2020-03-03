const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user == null) {
      // cant find user
      return done(null, false, { message: 'No user with that email' });
    }
    try {
      if (await bcrypt.compare(password, user.dataValues.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Password incorrect' });
    } catch (e) {
      return done(e);
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
    done(null, user.id);
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
