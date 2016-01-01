'use strict';

let React = require('react');
let Input = require('react-bootstrap/lib/Input');

let AceEditor = require('react-ace');
let brace     = require('brace');

require('brace/mode/javascript');
require('brace/theme/solarized_light');

require('./Editor.less');

let Editor = React.createClass({
    render() {
        return (
            <AceEditor
                value={this.props.value}
                name={this.props.label}
                onChange={this.props.onChange}

                mode="javascript"
                theme="solarized_light"
                editorProps={{$blockScrolling: true}}
                fontSize={16}
                height={310}
                width={'100%'}
                showGutter={false}
            />
        );
    }
});

module.exports = Editor;