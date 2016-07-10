import React from 'react';
const cx    = require('classnames');

const jsonUtils = require('../jsonUtils');

const AceEditor = require('react-ace');

import 'brace/mode/javascript';
import 'brace/mode/plain_text';
import 'brace/theme/monokai';

import './Output.less';

const Output = React.createClass({

    render() {
        const realisation = this.props.realisation;
        const status      = realisation.status;
        const isPassed    = status === 'PASSED';

        let value;

        console.log(status);
        const statusMessage = {
            FATAL:      'Validator throws an error',
            PASSED:     'Validation passed',
            NOT_PASSED: 'Validation NOT passed'
        };

        if (status === 'FATAL') {
            value = realisation.error;
        } else {
            value = jsonUtils.stringify(realisation.result.output || realisation.result.errors);
        }

        let outputClasses = cx({
            Output: true,
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
                    mode={status === 'FATAL' ? 'plain_text' : 'javascript'}
                    theme='monokai'
                    editorProps={{ $blockScrolling: true }}
                    showPrintMargin={false}
                    fontSize={fontSize}
                    maxLines={lines}
                    width={'100%'}
                    showGutter={false}
                    highlightActiveLine={false}
                    readOnly
                />
                <br/>
            </div>
        );
    }

});

export default Output;
