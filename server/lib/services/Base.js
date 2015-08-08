'use strict';

var Q         = require('q');
var Exception = require('../Exception');
var Validator = require('./Validator');


function Base(params) {
    this.validator       = new Validator();
    this.implementations = params.implementations;
    this.config          = params.config;
}

Base.prototype = {
    run: function(params) {
        return this.validate(params).then(this.execute.bind(this));
    }
};

module.exports = Base;