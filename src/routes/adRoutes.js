const express = require('express')

const adRouter = express.Router()
const adController = require('../controllers/adController')
const { validateJWTToken } = require('../middleware')

// GET /api/advertisement Gauti visa sarasa
adRouter.get('/advertisement', adController.all)

// GET /api/advertisement/:id Gauti viena reklama pagal ID
adRouter.get('/advertisement/:id', adController.single)

// POST  /api/advertisement Irasyti reklama
adRouter.post('/advertisement', validateJWTToken, adController.create)

// PUT /api/advertisement/:id reklamos duomenu atnaujinimas pagal nurodyta jo id
adRouter.put('/advertisement/:id', validateJWTToken, adController.update)

// DELETE /api/advertisement/:id reklamos istrinimas pagal nurodyta jo id
adRouter.delete('/advertisement/:id', validateJWTToken, adController.delete)

module.exports = adRouter
