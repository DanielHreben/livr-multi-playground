'use strict';

var util = require('util');
var Base = require('./Base');
var Q    = require('q');

function Implementations(params) {
    Implementations.super_.call(this, params);
}

util.inherits(Implementations, Base);

Implementations.prototype.list = function(req, res) {
    var params = req.query;
    var promise = this.run('implementations/List', {params: params});
    this.renderPromise(req, res, promise);
};

Implementations.prototype.validate = function(req, res) {
    var promise = this.run('implementations/Validate', {params: req.body});
    this.renderPromise(req, res, promise);
};

module.exports = Implementations;

