const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  // !Define the local strategy for email and password authentication
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // !fine the user by email
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, {
              message: "user not found with that email",
            });
          }
          // !compare the provided password with the hashed password in the database
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }
          // !Authentication successful, return the user object
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  // !serializeUser: Determines which data of the user object should be stored in the session. here, we store the user id.
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  // !Deserialize the user object based on the user id stored in the session
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
