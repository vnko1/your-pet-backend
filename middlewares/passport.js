const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { Users } = require("../services");
const { httpError, createToken } = require("../utils");
require("dotenv").config();

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: `${process.env.baseUrl}/users/google/callback`,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await Users.findUserByQuery({
            googleId: profile.id,
          });
          if (existingUser) return done(null, existingUser);
          // createToken
          const newUser = await Users.createUser({
            googleId: profile.id,
            email: profile.email,
            name: profile.name,
            // token,
            // tokenLifeTime,
            // refreshToken,
          });
          return done(null, newUser);
        } catch (error) {
          return done(httpError(400, error.messages), false);
        }
      }
    )
  );
};
