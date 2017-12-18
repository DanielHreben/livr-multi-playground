import React, { Component } from 'react';
import PropTypes      from 'prop-types';
import { observer } from 'mobx-react';
import debounce from 'lodash/debounce';
import ga from 'react-ga';

import Row       from 'react-bootstrap/lib/Row';
import Col       from 'react-bootstrap/lib/Col';

import Editor    from './components/Editor.jsx';
import Output    from './components/Output.jsx';
import HeadMenu  from './components/HeadMenu.jsx';
import Footer    from './components/Footer.jsx';
import StatusBar from './components/StatusBar.jsx';

import { parseURL, updateURL } from './utils';

import jsonUtils from './jsonUtils';
import presets   from './presets/';

import  API from './API';

import './App.less';

ga.initialize(window.config.ga.token);
ga.pageview(window.location.pathname);

const api = new API(ga);


@observer
class App extends Component {
    static propTypes = {
        appState : PropTypes.shape({
            rules           : PropTypes.object,
            input           : PropTypes.string,
            status          : PropTypes.string,
            message         : PropTypes.string,
            implementations : PropTypes.array
        })
    }
    static defaultProps = {
        appState : {
            rules           : {},
            input           : '',
            status          : '',
            message         : '',
            implementations : []
        }
    }

    componentWillMount() {
        const parsed = parseURL();
        const defaultPreset = presets[0].payload;

        if (window.location.hash === '') {
            this.props.appState.rules = defaultPreset.rules;
            this.props.appState.input = defaultPreset.input;
        } else {
            this.props.appState.rules = parsed.rules;
            this.props.appState.input = parsed.input || parsed.data; // Fallback
        }
    }

    componentDidMount() {
        const validateDebounced = debounce(this.validate.bind(this), window.config.debounceInterval);

        this.validateDebounced = () => {
            this.props.appState.status = 'loading';
            this.props.appState.message = 'Waiting for your input...';

            validateDebounced();
        };

        this.validate();
    }

    handleIEditorChange(type, text) {
        this.props.appState[type] = text;
        updateURL(this.props.appState.rules, this.props.appState.input);
        this.validateDebounced();
    }

    handlePresetSelect = preset => {
        this.props.appState.rules = preset.rules;
        this.props.appState.input = preset.input;

        updateURL(this.props.appState.rules, this.props.appState.input);
        this.validateDebounced();
    }

    async validate() {
        const data = {};

        [ 'input', 'rules' ].forEach(field => {
            try {
                const parsed = jsonUtils.parse(this.props.appState[field]);

                data[field] =  parsed;
            } catch (error) {
                console.log(error);
            }
        });

        if (data.input === undefined || data.rules === undefined) return;

        this.props.appState.status = 'loading';
        this.props.appState.message = 'Waiting for results...';

        try {
            const result = await api.validate(data.input, data.rules);

            if (result.error) {
                this.props.appState.status = 'error';
                this.props.appState.message = 'Oops! Shit happens!';

                console.error(result.error);

                return;
            }

            this.props.appState.status  = 'done';
            this.props.appState.message = 'Done!';

            console.log(result);
            this.props.appState.implementations = result.implementations;
        } catch (error) {
            console.error(error, error.stack);
            this.props.appState.status = 'error';
            this.props.appState.message = 'Network error!';
        }
    }

    render() {
        return (
            <div className='App container'>
                <HeadMenu
                    presets={presets}
                    onPresetClick={this.handlePresetSelect}
                />

                <Row>
                    <Col xs={6}>
                        <Editor
                            label='LIVR Rules'
                            value={this.props.appState.rules}
                            onChange={this.handleIEditorChange.bind(this, 'rules')}
                        />
                    </Col>

                    <Col xs={6}>
                        <Editor
                            label='Data for validation'
                            value={this.props.appState.input}
                            onChange={this.handleIEditorChange.bind(this, 'input')}
                        />
                    </Col>
                </Row>

                <br />

                <StatusBar
                    status={this.props.appState.status}
                    message={this.props.appState.message}
                />

                <hr />

                {
                    this.props.appState.implementations.map(implementation => (
                        <Output
                            key={implementation.name}
                            implementation={implementation}
                        />)
                    )
                }

                <Footer />
            </div>
        );
    }
}

export default App;
