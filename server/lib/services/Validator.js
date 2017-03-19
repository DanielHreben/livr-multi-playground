'use strict'

const Exception = require('../Exception')
const LIVR = require('livr')
LIVR.Validator.defaultAutoTrim(true)

class Validator {
  validate (data, rules) {
    const validator = new LIVR.Validator(rules).prepare()
    const result = validator.validate(data)

    if (!result) {
      throw new Exception({
        code: 'FORMAT_ERROR',
        fields: validator.getErrors()
      })
    }

    return result
  }
}

module.exports = Validator
