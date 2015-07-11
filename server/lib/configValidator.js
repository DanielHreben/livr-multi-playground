"use strict";

var LIVR      = require('livr');

function configValidator(config) {
    var validator = new LIVR.Validator({
        port: [ 'required', 'positive_integer' ],
        realisations: [ 'required', {nested_object: {
            path: 'required',
        }} ]
    });

    var clearedConfig = validator.validate(config);
    var fields        = validator.getErrors();

    /* istanbul ignore if */
    if (fields) {
        var error = "CHECK YOUR CONFIG! \n" + JSON.stringify(fields, null, 4);
        throw error;
    }

    return clearedConfig;

}


module.exports = configValidator;
