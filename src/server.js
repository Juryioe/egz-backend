require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { mainErrorHandler, validateJWTToken } = require('./middleware')
const adRouter = require('./routes/adRoutes')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

const { executeQuery } = require('./helpers')

const app = express()

const port = process.env.PORT || 3000

// Middlewares express, morgan, cors
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    message: 'Server Is Running',
  })
})

// Isidedame routus is router failu
app.use('/api', adRouter)
app.use('/api', authRouter)
app.use('/api', validateJWTToken, userRouter)

app.get('/test-connection', async (req, res) => {
  const sql = 'SELECT * FROM advertisement'
  const [advertisement, error] = await executeQuery(sql)

  res.json(advertisement)
})

app.use(mainErrorHandler)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
