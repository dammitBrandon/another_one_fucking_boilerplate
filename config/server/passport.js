import User from 'server/models/users';
import local from './passport-stategies/local';

export default function configurePassport(passport) {
  console.log('configurePassport, setting serializeUser and deserializeUser');
  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      return done(err, user);
    });
  });

  passport.use(local);
}
