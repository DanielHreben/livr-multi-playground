import JSON5 from 'json5';

export function parse(json) {
    console.log(json, '===============!');
    console.log(JSON5.parse(json), '=============11');
    return JSON5.parse(json);
}

export function stringify(data) {
    return JSON.stringify(data, null, '    ');
}

export default { parse, stringify };
