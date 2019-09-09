const { ExtractJwt, Strategy } = require('passport-jwt')

const { User } = require('./models/mongoSchema');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user =>
          (user)
            ? done(null, user)
            : done(null, false)
        )
        .catch(err => console.log(err));
    })
  )
}

