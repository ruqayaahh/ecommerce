const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers');
const { validateSignUp, checkIfUserExists, validateLogin } = require('../middlewares');

const userRouter = Router();

userRouter.post('/register', validateSignUp, checkIfUserExists, registerUser);
userRouter.post('/login', validateLogin, loginUser);

module.exports = userRouter;
