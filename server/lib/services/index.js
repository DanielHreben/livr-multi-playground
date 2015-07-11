'use strict';

var realisations = require('./realisations');

function init(params) {
    return {
        realisations: {
            Validate:  new realisations.Validate(params),
            List: new realisations.List(params),
        }
    };
}

module.exports = init;