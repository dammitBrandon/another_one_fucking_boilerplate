import { Router } from 'express';

let API = new Router();

API.get('/login', (req, res) => {
  console.log('/login ', req.query);
  res.sendStatus(200);
});

export default API;
