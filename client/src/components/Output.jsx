'use strict';

let React = require('react');
let cx    = require('classnames');

let Well  = require('react-bootstrap/lib/Well');
let jsonUtils = require('../jsonUtils');

let AceEditor = require('react-ace');
let brace     = require('brace');

require('brace/mode/javascript');
require('brace/theme/monokai');

require('./Output.less');


let Output = React.createClass({

    render() {
        let realisation = this.props.realisation;
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

        let fontSize = 16;
        let value    = jsonUtils.stringify( valid || errors );
        let lines    = value.split('\n').length;

        return (
            <div>
                <b>{realisation.name}</b>
                <br/>
                <small>{realisation.version}</small>

                <AceEditor
                    value={value}
                    name={realisation.version}
                    mode="javascript"
                    theme="monokai"
                    editorProps={{$blockScrolling: true}}
                    showPrintMargin={false}
                    fontSize={fontSize}
                    maxLines={lines}
                    width={'100%'}
                    showGutter={false}
                    highlightActiveLine={false}
                    readOnly={true}
                />
                <br/>
            </div>
        );
    }

});

module.exports = Output;