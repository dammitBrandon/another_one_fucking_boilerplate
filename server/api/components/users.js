import { Router } from 'express';
import Users from 'server/controllers/users';

let API = new Router();

API.post('/login', (req, res) => {
  console.log('attempting to login');
  console.log('req.body: ', req.body);
  console.log('req.query: ', req.query);
  res.sendStatus(200);
});

API.post('/register', (req, res) => {
  console.log('Registering a new user');
  console.log('req.query: ', req.query);
  console.log('req.body: ', req.body);
  Users.register(req, req.body)
    .then(user => res.send({ user }));
});

export default API;
