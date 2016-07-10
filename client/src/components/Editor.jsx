import React from 'react';

const AceEditor = require('react-ace');

require('brace/mode/javascript');
require('brace/theme/monokai');

require('./Editor.less');

const Editor = React.createClass({
    render() {
        const value    = this.props.value;
        let lines    = value.split('\n').length;

        return (
            <AceEditor
                value={this.props.value}
                name={this.props.label}
                onChange={this.props.onChange}

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
