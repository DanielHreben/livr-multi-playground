import { transform } from 'relaxed-json';

export default {
    parse: json => JSON.parse(transform(json)),
    stringify: data => JSON.stringify(data, null, '    ')
};
