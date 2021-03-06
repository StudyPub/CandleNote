const router = require('express').Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup'); // eslint-disable-line

router.get('/login', (req, res) => {
  res.send('login page!');
});

// console.log(passportSetup);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

router.get('/google', passport.authenticate('google', {
  scope: [
    'profile',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/plus.login'],
  accessType: 'offline',
  approvalPrompt: 'force',
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log('Logged in user: ', req.user.username);
  console.log('authenticated? : ', req.isAuthenticated());
  res.redirect('/profile');
});

// router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }));

// router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
//   res.send('You reached the callback uri!');
// });

module.exports = router;
