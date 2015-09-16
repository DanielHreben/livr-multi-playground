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
    var self = this;
    var implementationsDir = FS.directory(self.implementations.path);

    var implementationsPromises = self.implementations.list.clone().map(function(implementation) {
        var cwd = FS.join(implementationsDir, implementation.name);
        var cmd = './validate.' + implementation.extension;

        return execFile(
            cmd,
            [data.input, data.rules].map(JSON.stringify),
            { cwd: cwd }
        )
        .spread(JSON.parse)
        .then(function(result) {
            implementation.status = result.errors ? 'NOT_PASSED' : 'PASSED';
            implementation.result = result;
        })
        .catch(function(error) {
            implementation.status = 'FATAL';
            var re = new RegExp(['/', process.env.USER, '/'].join(''), 'g');
            implementation.error  = error.message.replace(re, '/<USER>/');
        })
        .thenResolve(implementation);
    });

    return Q.all(implementationsPromises).then(function(implementations) {
        return {implementations: implementations};
    });

};

module.exports = Validate;