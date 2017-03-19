'use strict'

const Service = require('../Service')

class Validate extends Service {
  validate (data) {
    const rules = {
      input: [ 'required', 'any_object' ],
      rules: [ 'required', 'any_object' ]
    }

    return this.validator.validate(data, rules)
  }

  async execute (data) {
    const implementations = await this.implementations.run(data.input, data.rules)
    return {implementations}
  }
}

module.exports = Validate
