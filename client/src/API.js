export default class API {
    constructor(ga) {
        this.ga = ga;
    }

    async list() {
        this.ga.event({ category: 'implementations', action: 'list' });

        const response = await fetch('/api/implementations');

        return response.json();
    }

    async validate(input, rules) {
        this.ga.event({ category: 'implementations', action: 'validate' });

        const response = await fetch('/api/implementations', {
            method  : 'post',
            headers : { 'Content-type': 'application/json; charset=UTF-8' },
            body    : JSON.stringify({ input, rules })
        });

        return response.json();
    }
}
