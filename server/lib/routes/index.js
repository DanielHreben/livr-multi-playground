'use strict';

var Realisations = require('./Realisations');


function init(services) {
    return {
        realisations: new Realisations(services),
    };
}

module.exports = init;