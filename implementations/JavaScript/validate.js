#!/usr/bin/env node
'use strict';

var LIVR = require('livr');

var input = JSON.parse(process.argv[2]);
var rules = JSON.parse(process.argv[3]);

var validator = new LIVR.Validator(rules);

var output = validator.validate(input);
var errors = validator.getErrors();

console.log(JSON.stringify(errors
    ? { errors: errors }
    : { output: output }
));
