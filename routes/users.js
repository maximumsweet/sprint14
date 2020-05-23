const usersRouter = require('express').Router();

const { getUser, createUser, getUsers } = require('../controllers/users');

usersRouter.get('/users/:id', getUser);

usersRouter.post('/users', createUser);

usersRouter.get('/users', getUsers);

module.exports = usersRouter;
