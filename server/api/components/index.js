import { Router } from 'express';
import TodosAPI from './todos';
import LoginAPI from './login';
import UsersAPI from './users';
import PageTypeTodosExampleAPI from './page-type-todos-example';

let API = new Router();

API.use('/Todos', TodosAPI);
API.use('/Login', LoginAPI);
API.use('/Users', UsersAPI);
API.use('/PageTypeTodosExample', PageTypeTodosExampleAPI);

export default API;
