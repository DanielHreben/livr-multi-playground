export default class API {
    constructor(ga) {
        this.ga = ga;
    }

    list() {
        this.ga.event({ category: 'implementations', action: 'list' });

        return fetch('/api/implementations').then(response =>
            response.json()
        );
    }

    validate(input, rules) {
        this.ga.event({ category: 'implementations', action: 'validate' });

        return fetch('/api/implementations', {
            method: 'post',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ input, rules })
        }).then(response => response.json());
    }
}
