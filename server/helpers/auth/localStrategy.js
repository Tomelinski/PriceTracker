const LocalStrategy = require('passport-local').Strategy;
const passport = require('./passport');
const { User } = require('../../models');
const { bcrypt, saltRounds } = require('../../database/config/bcryptConfig');

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { emailAddress: email } });

        if (!user) {
            console.log("User not found.");
            return done(null, false, { message: 'User not found.' });
        }
        
        const isValidPassword = await bcrypt.compareSync(password, user.password);
        
        if (!isValidPassword) {
            console.log("Incorrect password");
            return done(null, false, { message: 'Incorrect password.' });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
