const Implementations = require('./Implementations');

function init(services) {
    const routes = {
        implementations: new Implementations(services)
    };

    return function (actionName) {
        const [routeName, methodName] = actionName.split('/');

        const object = routes[routeName];
        const method = object[methodName];

        return method.bind(object);
    };
}

module.exports = init;
