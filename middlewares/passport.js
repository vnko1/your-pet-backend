const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { Users } = require("../services");
const { createToken } = require("../utils");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/users/google/callback`,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await Users.findUserByQuery({
            email: profile.email,
          });

          const [token, tokenLifeTime] = createToken(
            { email: profile.email },
            process.env.JWT_KEY,
            process.env.TOKEN_LIFE
          );

          const [refreshToken] = createToken(
            { email: profile.email },
            process.env.REFRESH_JWT_KEY,
            process.env.REFRESH_TOKEN_LIFE
          );

          if (existingUser) {
            const updateUser = await Users.updateUser({
              id: existingUser.id,
              data: { token, refreshToken, tokenLifeTime },
            });

            return done(null, updateUser);
          }

          const newUser = await Users.createUser({
            googleId: profile.id,
            email: profile.email,
            name: profile.displayName,
            token,
            tokenLifeTime,
            refreshToken,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
