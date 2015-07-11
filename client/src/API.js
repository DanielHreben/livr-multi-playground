'use strict';

class API {
    constructor(config) {
        this.rootUrl = config.rootUrl;
    }

    list() {
        ga('send', 'event', 'realisations', 'list');

        return fetch(this.rootUrl + '/realisations').then(function(response) {
            return response.json();
        });
    }

    validate(input, rules) {
        ga('send', 'event', 'realisations', 'validate');

        return fetch(this.rootUrl + '/realisations', {
            method: 'post',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({input: input, rules: rules})
        })
        .then(function(response) {
            return response.json();
        });
    }
}

module.exports = API;