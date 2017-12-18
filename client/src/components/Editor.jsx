import React from 'react';
import PropTypes      from 'prop-types';

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import './Editor.less';

const Editor = ({ value, label, onChange }) => {
    const lines    = value.split('\n').length;

    return (
        <div>
            <b>{label}</b>
            <AceEditor
                value={value}
                name={label}
                onChange={onChange}

                mode='javascript'
                theme='monokai'
                editorProps={{ $blockScrolling: true }}
                showPrintMargin={false}
                fontSize={16}
                maxLines={lines}
                width={'100%'}
                showGutter={false}
            />
        </div>
    );
};

Editor.propTypes = {
    value    : PropTypes.string.isRequired,
    label    : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired
};

export default Editor;
