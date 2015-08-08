'use strict';

var Implementations = require('./Implementations');


function init(services) {
    return {
        implementations: new Implementations(services),
    };
}

module.exports = init;