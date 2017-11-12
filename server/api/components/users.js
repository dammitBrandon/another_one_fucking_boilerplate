import { Router } from 'express';
import User from 'server/models/user';
// import passport from 'passport';
// import httpStatus from 'http-status';

let API = new Router();

// API.post('/login', (req, res, next) => {
  // console.log('users post /login, next: ', next);
  // console.log('attempting to authenticate user...');
  // passport.authenticate('local', (err, user, info) => {
  //   if (info) {
  //     console.log('Recieved info: ', info);
  //   }
  //
  //   if (err) {
  //     console.error('Error, failed to successfully authenticate user, err: ', err);
  //     return res.status(401).json(err);
  //   }
  //
  //   if (user) {
  //     console.log('User in session is, user: ', user);
  //     req.logIn(user, err => {
  //       if (err) {
  //         console.error('Error, failed to login');
  //         return res.status(401).json(err);
  //       }
  //
  //       console.log('Successfully able to login the user: ', user);
  //       return res.json(user);
  //     });
  //   }
  // });
// });

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

export default API;
