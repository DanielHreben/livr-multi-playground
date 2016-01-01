'use strict';

let React = require('react');
let cx    = require('classnames');

let Well  = require('react-bootstrap/lib/Well');
let jsonUtils = require('../jsonUtils');

require('./Output.less');


let Output = React.createClass({

    render() {
        let realisation = this.props.value;
        let status      = realisation.status;

        let valid;
        let errors;

        if (status == 'FATAL') {
            errors = realisation.error;
        } else {
            valid  = realisation.result.output;
            errors = realisation.result.errors;
        }

        let outputClasses = cx({
            "Output": true,
            valid: valid,
            error: errors
        });

        return (
            <Well className={outputClasses}>
                <pre>
                    { jsonUtils.stringify( valid || errors ) }
                </pre>
            </Well>
        );
    }

});

module.exports = Output;