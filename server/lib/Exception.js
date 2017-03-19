'use strict'

class Exception extends Error {
  constructor ({fields, code, message}) {
    /* istanbul ignore next */
    if (!data.fields) throw 'FIELDS REQUIRED'
    /* istanbul ignore next */
    if (!data.code) throw 'MESSAGE REQUIRED'

    super(code)

    this.code = code
    this.fields = fields
    this.message = message
  }

  toHash () {
    return {
      fields: this.fields,
      code: this.code
    }
  }
}

module.exports = Exception
