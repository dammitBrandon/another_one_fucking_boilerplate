import { Router } from 'express';

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
});

export default API;
