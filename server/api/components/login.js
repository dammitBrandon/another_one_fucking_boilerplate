import { Router } from 'express';
import User from 'server/models/user';
import passport from 'passport';

let API = new Router();

API.post('/login',
  passport.authenticate('local'),
  (req, res) => { // eslint-disable-line
    res.status(200).json(req.user);
  });

API.delete('/logout', (req, res) => {
  console.log('logging user out, req.user: ', req.user);
  res.sendStatus(200);
});

API.post('/register', (req, res) => {
  let user = new User({
    email: req.body.registrationForm.form.emailAddress,
    password: req.body.registrationForm.form.password,
    firstName: req.body.registrationForm.form.firstName,
    lastName: req.body.registrationForm.form.lastName
  });

  user.save(err => {
    if (err) {
      console.error('failed to save user, from within /register route, err: ', err);
    }

    req.logIn(user, err => {
      if (err) {
        console.error('failed to login on the req object, from within /register route, err: ', err);
        return res.send(err);
      }

      return res.json(user);
    });
  });
});

export default API;

