'use strict'

const Route = require('./Route')

class Implementations extends Route {
  list (req, res) {
    const promise = this.run('implementations/List', {params: req.query})
    this.renderPromise(req, res, promise)
  }

  validate (req, res) {
    const promise = this.run('implementations/Validate', {params: req.body})
    this.renderPromise(req, res, promise)
  }
}

module.exports = Implementations

