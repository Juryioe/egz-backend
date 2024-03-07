const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

// GET /api/user Gauti visa sarasa
userRouter.get('/users', userController.all);

// GET /api/user/:id Gauti viena vartotoja pagal ID
userRouter.get('/users/:id', userController.single);

// POST  /api/user Irasyti vartotoja
userRouter.post('/users', userController.create);

// PUT /api/user/:id Vartotojo duomenu atnaujinimas pagal nurodyta jo id
userRouter.put('/users/:id', userController.update);

// DELETE /api/user/:id Vartotojo istrinimas pagal nurodyta jo id
userRouter.delete('/users/:id', userController.delete);

module.exports = userRouter;
