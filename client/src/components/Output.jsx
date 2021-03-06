import React from 'react';
import PropTypes from 'prop-types';
import cx    from 'classnames';
import AceEditor from 'react-ace';

import jsonUtils from '../jsonUtils';

import 'brace/mode/javascript';
import 'brace/mode/plain_text';
import 'brace/theme/monokai';

import './Output.less';

const Output = ({ implementation }) => {
    const status      = implementation.status;
    const isPassed    = status === 'PASSED';

    let value;

    console.log(status);
    const statusMessage = {
        FATAL      : 'Validator throws an error',
        PASSED     : 'Validation passed',
        NOT_PASSED : 'Validation NOT passed'
    };

    if (status === 'FATAL') {
        value = implementation.error;
    } else {
        value = jsonUtils.stringify(implementation.result.output || implementation.result.errors);
    }

    const outputClasses = cx({
        Output : true,
        valid  : isPassed,
        error  : !isPassed
    });

    const fontSize = 16;
    const lines    = value.split('\n').length;

    return (
        <div>
            <b>{implementation.name}</b>

            <label className={outputClasses}>
                {statusMessage[status]}
            </label>

            <br />

            <small>
                {implementation.version}
            </small>

            <AceEditor
                value={value}
                name={implementation.version}
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
            <br />
        </div>
    );
};

Output.propTypes = {
    implementation : PropTypes.object.isRequired
};

export default Output;
