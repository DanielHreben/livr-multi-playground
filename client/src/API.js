export default class API {
    list() {
        ga('send', 'event', 'implementations', 'list');

        return fetch('/api/implementations').then(response =>
            response.json()
        );
    }

    validate(input, rules) {
        ga('send', 'event', 'implementations', 'validate');

        return fetch('/api/implementations', {
            method: 'post',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ input, rules })
        })
        .then(response => response.json());
    }
}
