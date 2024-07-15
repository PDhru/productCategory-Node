// localAuth.js

// const localStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");
// const userModel = require("../model/usermodel");

// const localauth = (passport) => {
//   passport.use(
//     new localStrategy(async (username, password, done) => {
//       try {
//         const user = await userModel.findOne({ username: username });
//         if (!user) {
//           return done(null, false, { message: "User not found." });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//           return done(null, false, { message: "Incorrect password." });
//         }

//         return done(null, user);
//       } catch (err) {
//         console.error("Error in local strategy:", err);
//         return done(err);
//       }
//     })
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await userModel.findOne({ _id: id });
//       if (!user) {
//         return done(null, false, { message: "User not found." });
//       }
//       done(null, user);
//     } catch (err) {
//       console.error("Error deserializing user:", err);
//       return done(err);
//     }
//   });
// };

// module.exports = localauth;


// localAuth.js

// localAuth.js

// localAuth.js

const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userModel = require("../model/usermodel");

const localauth = (passport) => {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await userModel.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "User not found." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        console.error("Error in local strategy:", err);
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    if (!user) {
      console.error("serializeUser: user is null");
    } else {
      console.log("serializeUser: user", user);
    }
    done(null, user._id); // Use _id instead of id
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id); // Use findById for MongoDB
      if (!user) {
        console.error("deserializeUser: User not found.");
        return done(null, false, { message: "User not found." });
      }
      console.log("deserializeUser: user", user);
      done(null, user);
    } catch (err) {
      console.error("Error deserializing user:", err);
      return done(err);
    }
  });

  // New function to log in user without password
  passport.use('otp', new localStrategy(
    { usernameField: 'email', passwordField: 'otp', passReqToCallback: true },
    async (req, email, otp, done) => {
      try {
        const user = await userModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        return done(null, user);
      } catch (err) {
        console.error("Error in OTP strategy:", err);
        return done(err);
      }
    }
  ));
};

module.exports = localauth;
