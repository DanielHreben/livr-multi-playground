'use strict';

let React = require('react');
let Input = require('react-bootstrap/lib/Input');

let AceEditor = require('react-ace');
let brace     = require('brace');

require('brace/mode/javascript');
require('brace/theme/monokai');

require('./Editor.less');

let Editor = React.createClass({
    render() {
        let fontSize = 16;
        let value    = this.props.value;
        let lines    = value.split('\n').length;

        return (
            <AceEditor
                value={this.props.value}
                name={this.props.label}
                onChange={this.props.onChange}

                mode="javascript"
                theme="monokai"
                editorProps={{$blockScrolling: true}}
                showPrintMargin={false}
                fontSize={16}
                maxLines={lines}
                width={'100%'}
                showGutter={false}
            />
        );
    }
});

module.exports = Editor;