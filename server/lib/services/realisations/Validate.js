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
    var realisationsDir = FS.directory(self.realisations.path);

    var realisationsPromises = self.realisations.list.clone().map(function(realisation) {
        return execFile(
            FS.join(realisationsDir, realisation.path),
            [data.input, data.rules].map(JSON.stringify)
        )
        .spread(JSON.parse)
        .then(function(result) {
            realisation.status = result.errors ? 'NOT_PASSED' : 'PASSED';
            realisation.result = result;
        })
        .catch(function(error) {
            realisation.status = 'FATAL';
            var re = new RegExp(['/', process.env.USER, '/'].join(''), 'g');
            realisation.error  = error.message.replace(re, '/<USER>/');
        })
        .thenResolve(realisation);
    });

    return Q.all(realisationsPromises).then(function(realisations) {
        return {realisations: realisations};
    });

};

module.exports = Validate;