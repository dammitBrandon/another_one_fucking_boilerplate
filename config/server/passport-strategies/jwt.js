import User from 'server/models/user';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import config from 'config';

export default new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.session.secret

    // Todo: Add issuer and Audience checks
  },
  (payload, done) => {
    User.findById(payload.id, (err, user) => {
      if (err) {
        console.error('Error attempting to find User by Id, err: ', err);
        return done(err, false);
      }

      if (user) {
        console.log('User found, user: ', user);
        return done(null, user);
      }

      console.log('Unable to continue for some odd reason');
      return done(null, false);
    });
  });
