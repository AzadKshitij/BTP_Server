// @ts-nocheck
// import all the things we need
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const { User } = require("../models");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        hd: "iitj.ac.in",
      },
      async (accessToken, refreshToken, profile, done) => {
        if (profile._json.hd === "iitj.ac.in") {
          console.info("User".info, profile);
          console.info("User".info, profile._json);
          //get the user data from google

          var regExp = /\(([^)]+)\)/;
          var matches = regExp.exec(profile.name.familyName);
          const newUser = {
            googleId: profile.id,
            name: profile.name.givenName,
            avatar: 0,
            email: profile.emails[0].value,
            rollNo: matches[1],
          };

          try {
            //find the user in our database
            let user = await User.findOne({ where: { googleId: profile.id } });

            if (user) {
              //If user present in our database.
              done(null, user);
            } else {
              // if user is not preset in our database save user data to database.
              user = await User.create(newUser);
              done(null, user);
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          // fail
          done(null, false, "Bad Email");
          return;
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.dataValues.id);
  });

  // used to deserialize the user
  passport.deserializeUser((user, done) => {
    User.findByPk(user)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  });
};
