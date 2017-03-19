'use strict'

const config = require('./lib/configValidator')(require('./etc/config'))
const Implementations = require('./lib/Implementations')

const bunyan = require('bunyan')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json({limit: 1024 * 1024}))
app.use(bodyParser.urlencoded({extended: false}))

const logger = bunyan.createLogger({name: 'livr-multi-playground'})

const implementations = new Implementations({
  config: config.implementations,
  logger
})

const services = require('./lib/services/')({
  implementations,
  logger,
  config: config.service
})

const routes = require('./lib/routes/')({
  services,
  logger
})

const router = express.Router()
app.use('/api', router)

router.post('/implementations', routes('implementations/validate'))
router.get('/implementations', routes('implementations/list'))

async function start () {
  await implementations.init()
  await new Promise((resolve, reject) => app.listen(config.port, error => {
    error ? reject(error) : resolve()
  }))
}

start()
