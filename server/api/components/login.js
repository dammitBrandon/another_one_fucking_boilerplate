import { Router } from 'express';
import User from 'server/models/user';
import passport from 'passport';
import AuthService from 'server/AuthService';

let API = new Router();

API.post('/login-test',
  passport.authenticate('local'),
  (req, res) => { // eslint-disable-line
    console.log('Inside login post route, calling AuthService#setUserInfo');
    console.log('req.user: ', req.user);

    let userInfo = AuthService.setUserInfo(req.user);

    console.log('Inside login post route, userInfo: ', userInfo);

    res.status(200).json({
      token: `JWT ${AuthService.generateWebToken(userInfo)}`,
      user: userInfo
    });
  });

API.delete('/logout', (req, res) => {
  console.log('logging user out, req.user: ', req.user);
  req.logOut();
  console.log('user is logged out, req.user: ', req.user);
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

      let userInfo = AuthService.setUserInfo(user);

      return res.status(201).json({
        token: `JWT ${AuthService.generateWebToken(userInfo)}`,
        user: userInfo
      });
    });
  });
});

export default API;

