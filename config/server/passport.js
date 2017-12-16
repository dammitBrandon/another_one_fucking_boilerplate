import User from 'server/models/user';
import localStrategy from './passport-strategies/local';
import JWTStrategy from './passport-strategies/jwt';

export default (server, passport) => {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(JWTStrategy);
  passport.use(localStrategy);
};
