#!/usr/bin/env node

const http = require('http')
const https = require('https')
const logger = require('./utils/logger')
const config = require('./utils/config')

const httpServer = http.createServer(require('./app'))

httpServer.listen(config.HTTP_PORT, () => {
  logger.info(`HTTP Server is listening at port ${config.HTTP_PORT}`)
})

