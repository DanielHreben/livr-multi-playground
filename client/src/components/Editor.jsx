import React from 'react';

const AceEditor = require('react-ace');

require('brace/mode/javascript');
require('brace/theme/monokai');

require('./Editor.less');

const Editor = React.createClass({
    render() {
        const { value, label, onChange } = this.props;
        let lines    = value.split('\n').length;

        return (
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
        );
    }
});

export default Editor;
