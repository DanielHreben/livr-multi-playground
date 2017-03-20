class Exception extends Error {
    constructor({ fields, code, message }) {
        if (!fields) throw new Error('FIELDS REQUIRED');
        if (!code) throw new Error('MESSAGE REQUIRED');

        super(code);

        this.code = code;
        this.fields = fields;
        this.message = message;
    }

    toHash() {
        return {
            fields: this.fields,
            code: this.code
        };
    }
}

module.exports = Exception;
