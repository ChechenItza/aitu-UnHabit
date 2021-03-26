require('express-async-errors')
const path = require('path')
const express = require('express')
const app = express()

const cors = require('cors')
if (process.env.NODE_ENV === 'development') {
  app.use(cors())
}

const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
  logger.info('connected to db')
})
.catch((error) => {
  logger.error('error connecting to db:', error.message)
})

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
  app.use(middleware.requestLogger)
}

app.use('/api/decks', require('./controllers/decks'))
app.use('/api/debts', require('./controllers/debts'))

app.use('/', express.static(path.join(__dirname, 'build')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app