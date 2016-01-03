'use strict';

let React = require('react');
let cx    = require('classnames');

let Well  = require('react-bootstrap/lib/Well');
let jsonUtils = require('../jsonUtils');

let AceEditor = require('react-ace');
let brace     = require('brace');

require('brace/mode/javascript');
require('brace/mode/plain_text');
require('brace/theme/monokai');

require('./Output.less');


let Output = React.createClass({

    render() {
        let realisation = this.props.realisation;
        let status      = realisation.status;
        let isPassed    = status == 'PASSED';

        let value;
        console.log(status);
        let statusMessage = {
            FATAL:      'Validator throws an error',
            PASSED:     'Validation passed',
            NOT_PASSED: 'Validation NOT passed'
        };

        if (status == 'FATAL') {
            value = realisation.error;
        } else {
            value = jsonUtils.stringify( realisation.result.output || realisation.result.errors );
        }

        let outputClasses = cx({
            "Output": true,
            valid: isPassed,
            error: !isPassed
        });

        let fontSize = 16;
        let lines    = value.split('\n').length;

        return (
            <div>
                <b>{realisation.name}</b>

                <label className={outputClasses}>
                    {statusMessage[status]}
                </label>

                <br/>

                <small>
                    {realisation.version}
                </small>

                <AceEditor
                    value={value}
                    name={realisation.version}
                    mode={ status == "FATAL" ? "plain_text" : "javascript"}
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