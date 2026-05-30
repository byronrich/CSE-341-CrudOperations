const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const db = getDb();
      const users = db.collection('users');

      let user = await users.findOne({ googleId: profile.id });

      if (!user) {
        const newUser = {
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        };
        const result = await users.insertOne(newUser);
        user = result.ops ? result.ops[0] : newUser;
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id || user.id);
});

passport.deserializeUser(async (id, done) => {
  const db = getDb();
  const users = db.collection('users');
  const user = await users.findOne({ _id: new ObjectId(id) });
  done(null, user);
});
