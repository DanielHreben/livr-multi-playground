const implementations = require('./implementations');

function init(params) {
    return {
        implementations: {
            Validate: new implementations.Validate(params),
            List: new implementations.List(params)
        }
    };
}

module.exports = init;
