'use strict'

const Exception = require('../Exception')
const Validator = require('./Validator')

class Service {
  constructor (params) {
    this.validator = new Validator()
    this.implementations = params.implementations
    this.config = params.config
  }
  async run (data) {
    const validatedData = await this.validate(data)
    return this.execute(validatedData)
  }
}

module.exports = Service
