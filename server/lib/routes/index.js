'use strict';

var Implementations = require('./Implementations');


function init(services) {
    var routes = {
        implementations: new Implementations(services),
    };

    return function(actionName) {
        var actionPath = actionName.split('/');

        var object = routes[ actionPath[0] ];
        var method = object[ actionPath[1] ];

        return method.bind(object);
    };
}

module.exports = init;