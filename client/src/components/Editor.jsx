import React from 'react';

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import './Editor.less';

const Editor = React.createClass({
    render() {
        const { value, label, onChange } = this.props;
        const lines    = value.split('\n').length;

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
