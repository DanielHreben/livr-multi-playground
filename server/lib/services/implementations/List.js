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
    var self = this;

    var implementations = this.implementations.list;

    return {implementations: implementations};
};

module.exports = List;