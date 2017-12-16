import { Router } from 'express';
import User from 'server/models/user';

let API = new Router();

API.post('/login', (req, res, next) => { // eslint-disable-line
  console.log('inside /login post');
  res.sendStatus(200);
});

API.delete('/logout', (req, res) => {
  console.log('logging user out, req.user: ', req.user);
  res.sendStatus(200);
});

API.post('/register', (req, res) => {
  console.log('inside /register post');

  let user = new User({
    email: req.body.registrationForm.form.emailAddress,
    password: req.body.registrationForm.form.password,
    firstName: req.body.registrationForm.form.firstName,
    lastName: req.body.registrationForm.form.lastName
  });

  console.log('new User: ', user);
  console.log('attempting to saving user, from within /register route');
  user.save(err => {
    if (err) { console.error('failed to save user, from within /register route, err: ', err);}
    console.log('user has been created, from within /register route, user: ', user);
    req.logIn(user, err => {
      if (err) {
        console.error('failed to login on the req object, from within /register route, err: ', err);
        return res.send(err);
      }
      console.log('successfully saved user, from within /register route');
      return res.json(user);
    });
  });
});

export default API;

