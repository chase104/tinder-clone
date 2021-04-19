const local = require('passport-local')
const bcrypt = require('bcrypt')
const UserModel = require('./userModel.js')

module.exports = function(passport) {
  const localStrategy = local.Strategy
  passport.use(
    new localStrategy({usernameField: 'email'}, async(email, password, done) => {
      const user = await UserModel.findOne({email: email})
      if (!user) {
        return done(null, false, { message: "No user with that email"})
      };
      console.log("uerrr: ", user);
      bcrypt.compare(password, user.password, (err, isMatch) => {
        console.log("isMatch: ", isMatch);
        if (err) throw err;
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: "Password incorrect"})
        }
      })
    })
  );
  passport.serializeUser((user, done) => {
      done(null, user.id);
  })
  passport.deserializeUser((id, done) => {
      UserModel.findById(id, function(err, user) {
        if (err) throw err
        return done(null, user)
      })
    })
}
