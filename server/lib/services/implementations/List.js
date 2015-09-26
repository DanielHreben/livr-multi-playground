'use strict';

var Q     = require('q');
var Base  = require('../Base');
var util  = require('util');

function List(args) {
    List.super_.call(this, args);
}

util.inherits(List, Base);

List.prototype.validate = function() {
    return Q();
};

List.prototype.execute = function() {
    return {implementations: this.implementations.list()};
};

module.exports = List;