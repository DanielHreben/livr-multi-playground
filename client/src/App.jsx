import React from 'react';
const debounce = require('lodash/debounce');

let Row    = require('react-bootstrap/lib/Row');
let Col    = require('react-bootstrap/lib/Col');

import Editor  from './components/Editor.jsx';
import Output    from './components/Output.jsx';
import HeadMenu  from './components/HeadMenu.jsx';
import Footer    from './components/Footer.jsx';
import StatusBar from './components/StatusBar.jsx';

const jsonUtils = require('./jsonUtils');
import  API   from './API';
let presets   = require('./presets/');
import 'babel-polyfill';

import './App.less';

const api = new API(window.config.api);

const App = React.createClass({
    componentDidMount() {
        const validateDebounced = debounce(this.validate, window.config.debounceInterval);

        this.validateDebounced = () => {
            this.setState({
                status:  'loading',
                message: 'Waiting for your input...'
            });
            validateDebounced();
        };

        this.validate();
    },

    getInitialState() {
        const parsed = this.parseURL();

        return {
            rules: parsed.rules,
            input: parsed.input || parsed.data, // Fallback
            implementations: [],
            fields: {
                input: '',
                rules: ''
            },
            message:  'Waiting for your input...',
            status:   'pending'
        };
    },

    validate() {
        const data = {};

        ['input', 'rules'].forEach(field => {
            try {
                const parsed = jsonUtils.parse(this.state[field]);
                this.state.fields[field] = '';
                data[field] =  parsed;
            } catch (error) {
                console.log(error);
                this.state.fields[field] = 'error';
            }
        });

        this.forceUpdate();

        if (data.input === undefined || data.rules === undefined) return;

        this.setState({
            status:  'loading',
            message: 'Waiting for results...'
        });

        api.validate(data.input, data.rules)
            .then(result => {
                if (!result.status) {
                    this.setState({
                        status: 'error',
                        message: 'Oops! Shit happens!'
                    });

                    console.error(result.error);
                    return;
                }

                this.setState({
                    status:  'done',
                    message: 'Done!'
                });
                console.log(result);
                this.setState({ implementations: result.implementations });
            })
            .catch(error => console.error(error, error.stack));
    },

    handleIEditorChange(type, text) {
        this.state[type] = text;
        this.setState(this.state, () => {
            this.updateURL();
            this.validateDebounced();
        });
    },

    handlePresetSelect(preset) {
        this.setState({
            rules: preset.rules,
            input: preset.input
        }, () => {
            this.updateURL();
            this.validateDebounced();
        });
    },

    updateURL() {
        window.location.hash = encodeURIComponent(JSON.stringify({
            rules: this.state.rules,
            input: this.state.input
        }));
    },

    parseURL() {
        try {
            const decoded = decodeURIComponent(window.location.hash).replace(/^#/, '');
            return jsonUtils.parse(decoded);
        } catch (e) {
            console.warn(e);
            return {
                rules: '{}',
                input: '{}'
            };
        }
    },

    render() {
        return (
            <div className='App container'>
                <HeadMenu presets={presets} onPresetClick={this.handlePresetSelect}/>

                <Row>
                    <Col xs={6}>
                        <Editor label='LIVR Rules'
                            value={this.state.rules}
                            bsStyle={this.state.fields.rules}
                            onChange={this.handleIEditorChange.bind(this, 'rules')}
                        />
                    </Col>

                    <Col xs={6}>
                        <Editor
                            label='Data for validation'
                            value={this.state.input}
                            bsStyle={this.state.fields.input}
                            onChange={this.handleIEditorChange.bind(this, 'input')}
                        />
                    </Col>
                </Row>

                <br/>

                <StatusBar
                    status={this.state.status}
                    message={this.state.message}
                />

                <hr/>

                {
                  this.state.implementations.map((realisation, i) =>
                      <Output key={i} realisation={realisation} />
                )}

                <Footer />
            </div>
        );
    }
});

export default App;
