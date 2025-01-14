const express = require('express');
const { getMe, login, logout, refresh, register } = require('./authController');

const authRouter = express.Router();

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/refresh').post(refresh);
authRouter.route('/me').post(getMe);
authRouter.route('/logout').post(logout);

module.exports = authRouter;
