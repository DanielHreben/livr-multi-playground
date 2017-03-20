const Service = require('../Service');

class List extends Service {
    validate() {

    }

    execute() {
        return { implementations: this.implementations.list() };
    }
}

module.exports = List;
