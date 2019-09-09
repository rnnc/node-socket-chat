const express = require('express');
const passport = require('passport');

const messages = require('./api/messages');
const users = require('./api/users');

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('api working')
  res.json({ message: "Routes Work" });
})

router.post('/register', (req, res) => {
  const { body } = req;

  users.registerUser(body)
    .then(JWT => {
      res.json({ success: true, token: 'Bearer ' + JWT });
    })
    .catch(error => {
      console.log(error);
      res.json({ success: false, error });
    })
});

router.post('/login', (req, res) => {

  const { body } = req;

  users.loginUser(body)
    .then(JWT => {
      res.json({ success: true, token: 'Bearer ' + JWT })
    })
    .catch(error => {
      console.log(error);
      res.json({ success: false, error })
    })
});

// auth testing route
router.get('/current', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('current');
    res.json({
      id: req.user.id,
      username: req.user.username
    })
  }
)

module.exports = router;