import User from 'server/models/user';
import { Strategy as LocalStrategy } from 'passport-local';

export default new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    console.log('inside local');

    User.findOne({ email }, (err, user) => {
      if (err) {
        console.error('Error, unable to find user, err: ', err);
      }

      if (!user) {
        console.log('User email not found!, user: ', user);
        return done(null, false);
      }

      console.log('using local strategy to authenticate user...');
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          console.log('User has been found, user: ', user);
          req.user = user;
          console.log('done is the call back fn: ', done);
          return done(null, user);
        }
        console.log('User found, invalid password');
        return done(null, false);
      });
    });
  });
