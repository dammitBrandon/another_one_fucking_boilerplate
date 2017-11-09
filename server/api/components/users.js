import { Router } from 'express';
import User from 'server/models/user';
import passport from 'passport';
// import httpStatus from 'http-status';

let API = new Router();

API.post('/login', passport.authenticate('local', {}, (req, res) => {
  console.log('attempting to login');
  res.redirect('/');
}));

API.post('/register', (req, res) => {
  console.log('creating a new user');
  let user = new User({ email: req.body.registrationForm.form.emailAddress, password: req.body.registrationForm.form.password });

  console.log('new User: ', user);
  console.log('attempting to saving user');
  user.save(err => {
    if (err) { console.error('failed to save user, err: ', err);}
    console.log('user has been created, user: ', user);
    req.login(user, err => {
      if (err) {
        console.error('failed to login on the req object, err: ', err);
        return res.send(err);
      }
      return res.send(user);
    });
  });
});

export default API;
