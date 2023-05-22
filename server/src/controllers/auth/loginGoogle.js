const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const loginOauth = async (req, res, next) => {
  const authUser = req.user;
  const user = await User.findOne({ oauth_id: authUser.oauth_id });
  //compare password to hashedPassword
  if (user) {
    const payload = {
      username: user.username,
      name: user.name,
      id: user.id,
      yoB: user.yoB,
      isAdmin: user.isAdmin,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '30m',
    });

    return res.status(200).json({
      status: 200,
      message: 'Login successfully!',
      profile: { ...payload },
      accessToken: accessToken,
    });
  } else {
    res.status(500).json('Internal Server Error!');
    return next(e);
  }
};

// Google API
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '33568893407-f04fp9hslih8ou12pstifudsj9ph0j0h.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      //get the user data from google
      const newUser = {
        oauth_id: profile.id,
        imgURL: profile.photos[0].value,
        name: profile.name.familyName,
      };

      try {
        //find the user in our database
        let user = await User.findOne({ oauth_id: profile.id });

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
    }
  )
);

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = { loginOauth };
