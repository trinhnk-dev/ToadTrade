const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const { loginOauth } = require('../controllers/auth/loginGoogle');

/* GOOGLE ROUTER */

authRouter.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get('/login/authOauth', loginOauth);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  // loginOauth
  function (req, res) {
    res.redirect('/api/auth/login/authOauth');
  }
);

module.exports = authRouter;
