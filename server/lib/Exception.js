'use strict';

var util  = require('util');

function Exception(data) {
    /* istanbul ignore next */
    if (!data.fields) throw "FIELDS REQUIRED";
    /* istanbul ignore next */
    if (!data.code)   throw "MESSAGE REQUIRED";

    this.fields  = data.fields;
    this.code    = data.code;
    this.message = data.message;
}
util.inherits(Exception, Error);


Exception.prototype.toHash = function() {
    return {
        fields: this.fields,
        code:   this.code
    };
};

Exception.prototype.addPrefix = function(prefix) {
    var fields = {};
    fields[prefix] = this.fields;

    this.fields = fields;

    return this;
}


module.exports = Exception;
