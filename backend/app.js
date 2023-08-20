const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')    // zur Kommunikation unterschiedlicher Ports
require('express-async-errors')


const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const articlesRouter = require ('./controllers/articles')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to', config.POPO)

mongoose.connect(config.POPO)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.info('error connection to MongoDB:', error.message)
    })

app.use(cors())

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

//app.use('/api/users', usersRouter) //gibt route vor, sodass Pfad nicht in jeder route angegeben werden muss
app.use('/api/login', loginRouter)
app.use('/api/articles', articlesRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
