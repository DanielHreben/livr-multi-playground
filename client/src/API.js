export default class API {
    constructor(config) {
        this.rootUrl = config.rootUrl;
    }

    list() {
        ga('send', 'event', 'implementations', 'list');

        return fetch(`${this.rootUrl}/implementations`).then(response =>
            response.json()
        );
    }

    validate(input, rules) {
        ga('send', 'event', 'implementations', 'validate');

        return fetch(`${this.rootUrl}/implementations`, {
            method: 'post',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ input, rules })
        })
        .then(response => response.json());
    }
}
