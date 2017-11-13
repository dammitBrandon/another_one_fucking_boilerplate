import { Router } from 'express';
import User from 'server/models/user';
import passport from 'passport';
// import httpStatus from 'http-status';

let API = new Router();

API.post('/register', (req, res) => {
  console.log('creating a new user');
  let user = new User({
    email: req.body.registrationForm.form.emailAddress,
    password: req.body.registrationForm.form.password,
    firstName: req.body.registrationForm.form.firstName,
    lastName: req.body.registrationForm.form.lastName
  });

  console.log('new User: ', user);
  console.log('attempting to saving user');
  user.save(err => {
    if (err) { console.error('failed to save user, err: ', err);}
    console.log('user has been created, user: ', user);
    req.logIn(user, err => {
      if (err) {
        console.error('failed to login on the req object, err: ', err);
        return res.send(err);
      }
      console.log('successfully saved user');
      return res.json(user);
    });
  });
});

API.post('/register', passport.authenticate('local-register', {
  successRedirect: '/',
  failureRedirect: '/register'
}));

export default API;
