const jsonUtils = require('./jsonUtils');

export function parseURL() {
    try {
        const decoded = decodeURIComponent(window.location.hash).replace(/^#/, '');

        return jsonUtils.parse(decoded);
    } catch (e) {
        console.warn(e);
        return {
            rules: '{}',
            input: '{}'
        };
    }
}

export function updateURL(rules, input) {
    window.location.hash = encodeURIComponent(JSON.stringify({ rules, input }));
}
