

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (email, password, callback)=>{

    

  }))
