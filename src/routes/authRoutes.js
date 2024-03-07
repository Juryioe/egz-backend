const express = require('express');

const authController = require('../controllers/authController');

const authRouter = express.Router();

// Auth controller login action
authRouter.post('/auth/login', authController.login);

// Auth controller register action
authRouter.post('/auth/register', authController.register);

module.exports = authRouter;
