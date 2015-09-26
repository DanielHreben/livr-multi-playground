'use strict';

var Q        = require('q');
var Base     = require('../Base');
var util     = require('util');
var FS       = require('q-io/fs');
var execFile = Q.denodeify(require('child_process').execFile);

function Validate(args) {
    Validate.super_.call(this, args);
}

util.inherits(Validate, Base);

Validate.prototype.validate = function(data) {
    var rules = {
        input: [ 'required', 'any_object' ],
        rules: [ 'required', 'any_object' ],
    };

    return this.validator.validate(data, rules);
};

Validate.prototype.execute = function(data) {
    return this.implementations.run(data.input, data.rules).then(function(implementations) {
        return {implementations: implementations};
    });

};

module.exports = Validate;