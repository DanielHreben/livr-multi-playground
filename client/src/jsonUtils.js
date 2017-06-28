import relaxedJSON from 'relaxed-json';

export function parse(json) {
    return JSON.parse(relaxedJSON.transform(json));
}

export function stringify(data) {
    return JSON.stringify(data, null, '    ');
}

export default { parse, stringify };
