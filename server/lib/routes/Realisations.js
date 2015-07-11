'use strict';

var util = require('util');
var Base = require('./Base');
var Q    = require('q');

function Realisations(params) {
    Realisations.super_.call(this, params);
}

util.inherits(Realisations, Base);

Realisations.prototype.list = function(req, res) {
    var params = req.query;
    var promise = this.run('realisations/List', {params: params});
    this.renderPromise(req, res, promise);
};

Realisations.prototype.validate = function(req, res) {
    var promise = this.run('realisations/Validate', {params: req.body});
    this.renderPromise(req, res, promise);
};

module.exports = Realisations;

