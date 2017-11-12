import { Router } from 'express';
import passport from 'passport';

let API = new Router();

API.get('/login', (req, res) => {
  res.sendStatus(200);
});

API.post('/login', passport.authenticate('local'),
  (req, res, next) => { // eslint-disable-line
    console.log('login post /login');
    console.log('not sure what im doing here..., check if user is on req.obj: ', req.user);
    return res.json(req.user);
  });

export default API;
