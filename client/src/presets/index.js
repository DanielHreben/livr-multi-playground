/* eslint-disable import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/no-commonjs */
export default [
    {
        id      : 'Registration form',
        payload : {
            rules : require('raw-loader!./registration-form/rules.raw'),
            input : require('raw-loader!./registration-form/input.raw')
        }
    },
    {
        id      : 'Validation of nested object',
        payload : {
            rules : require('raw-loader!./nested-object/rules.raw'),
            input : require('raw-loader!./nested-object/input.raw')
        }
    },
    {
        id      : 'Validation of simple order list',
        payload : {
            rules : require('raw-loader!./simple-list/rules.raw'),
            input : require('raw-loader!./simple-list/input.raw')
        }
    },
    {
        id      : 'Validation of order list with products objects',
        payload : {
            rules : require('raw-loader!./list-of-objects/rules.raw'),
            input : require('raw-loader!./list-of-objects/input.raw')
        }
    },
    {
        id      : 'Validation of order list with different product objects',
        payload : {
            rules : require('raw-loader!./different-objects/rules.raw'),
            input : require('raw-loader!./different-objects/input.raw')
        }
    }
];
