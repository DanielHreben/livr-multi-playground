'use strict';

var Q         = require('q');
var Exception = require('../Exception');
var LIVR      = require('livr');
LIVR.Validator.defaultAutoTrim(true);

function Validator() {
    var defaultRules = {
        any_object: function() {
            return function(value) {
                if ( value === undefined || value === null || value === '' ) return;
                if ( typeof value != 'object' ) return 'FORMAT_ERROR';
                return;
            };
        }
    };

    LIVR.Validator.registerDefaultRules(defaultRules);
}

Validator.prototype.validate = function(data, rules) {
    var validator = new LIVR.Validator(rules).prepare();

    var result = validator.validate(data);

    if (!result) {
        var exception = new Exception({
            code:   "FORMAT_ERROR",
            fields: validator.getErrors()
        });

        return Q.reject(exception);
    }

    return Q(result);
};

module.exports = Validator;