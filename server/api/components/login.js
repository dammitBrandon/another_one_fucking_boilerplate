import { Router } from 'express';
import passport from 'passport';

let API = new Router();

API.get('/login', (req, res) => {
  res.sendStatus(200);
});

API.post('/login', passport.authenticate('local-login'),
  (req, res, next) => { // eslint-disable-line
    console.log('after passport authenticate inside /login post');
    next();
  });

API.delete('/logout', (req, res) => {
  console.log('logging user out, req.session: ', req.session);
  console.log('logging user out, req.user: ', req.user);
  req.logout();
  console.log('============ req.logout() =============');
  console.log('logging user out, req.session: ', req.session);
  console.log('logging user out, req.user: ', req.user);
  res.sendStatus(200);
});

export default API;
