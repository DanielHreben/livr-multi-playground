'use strict'

const LIVR = require('livr')

function configValidator (config) {
  const validator = new LIVR.Validator({
    port: [ 'required', 'positive_integer' ],
    implementations: [ 'required', {nested_object: {
      path: 'required'
    }} ]
  })

  const clearedConfig = validator.validate(config)
  const fields = validator.getErrors()

  /* istanbul ignore if */
  if (fields) {
    throw 'CHECK YOUR CONFIG! \n' + JSON.stringify(fields, null, 4)
  }

  return clearedConfig
}

module.exports = configValidator
