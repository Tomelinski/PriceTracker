const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("./passport");
const { User } = require("../../models");
const googleConfig = require("../../database/config/google");
const config = require("../../database/config/app.config");

passport.use(
  new GoogleStrategy(
    {
      clientID: googleConfig.google.clientId,
      clientSecret: googleConfig.google.clientSecret,
      callbackURL: `${config.development.url}:8000/auth/google/redirect`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ where: { emailAddress: profile.emails[0].value } });

        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            emailAddress: profile.emails[0].value,
          });

          done(null, newUser);
        }
      } catch (error) {
        done(error);
      }
    },
  ),
);

module.exports = passport;
