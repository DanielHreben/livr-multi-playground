'use strict';

let React    = require('react');
let debounce = require('lodash').debounce;

let Row    = require('react-bootstrap/lib/Row');
let Col    = require('react-bootstrap/lib/Col');

let Editor    = require('./components/Editor.jsx');
let Output    = require('./components/Output.jsx');
let HeadMenu  = require('./components/HeadMenu.jsx');
let Footer    = require('./components/Footer.jsx');
let StatusBar = require('./components/StatusBar.jsx');

let jsonUtils = require('./jsonUtils');
let API       = require('./API');
let presets   = require('./presets/');

require('./App.less');

let api = new API(config.api);

let App = React.createClass({
    componentDidMount() {
        let validateDebounced = debounce(this.validate, config.debounceInterval);

        this.validateDebounced = () => {
            this.setState({
                status:  'loading',
                message: 'Wait for your input...'
            });
            validateDebounced();
        };

        this.validate();
    },

    getInitialState() {
        let parsed = this.parseURL();

        return {
            rules: parsed.rules,
            input: parsed.input,
            implementations: [],
            fields: {
            	input: 'primary',
            	rules: 'primary',
            },
            message:  'Wait for your input...',
            status:   'pending',
        };
    },

    validate() {
        let data = {};

        [ 'input', 'rules' ].forEach(field => {
            try {
                let parsed = jsonUtils.parse(this.state[field]);
                this.state.fields[field] = 'primary';
                data[field] =  parsed;
            } catch (error) {
                this.state.fields[field] = 'error';
            }
        });

        this.forceUpdate();

        if (data.input === undefined || data.rules === undefined) return;

        this.setState({
            status:  'loading',
            message: 'Wait for results...'
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
                this.setState({implementations: result.implementations});
            })
            .catch(error => console.error(error));
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
            input: preset.input,
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
            let decoded = decodeURIComponent(window.location.hash);
            decoded = decoded.replace(/^#/, '');
            return jsonUtils.parse( decoded );
        } catch(e) {
            console.warn(e);
            return {
                rules: '{}',
                input: '{}'
            };
        }
    },

    render() {
        return <div className="App container">
            <HeadMenu presets={presets} onPresetClick={this.handlePresetSelect}/>

            <Row>
                <Col xs={6}>
                    <Editor label='LIVR Rules'
                            value={this.state.rules}
                            bsStyle={this.state.fields.rules}
                            onChange={this.handleIEditorChange.bind(this, 'rules')} />
                </Col>

                 <Col xs={6}>
                    <Editor label='Data for validation'
                            value={this.state.input}
                            bsStyle={this.state.fields.input}
                            onChange={this.handleIEditorChange.bind(this, 'input')} />
                </Col>
            </Row>

            <StatusBar status={this.state.status}
                       message={this.state.message}/>

            <hr/>

            {this.state.implementations.map(realisation => {
                return <div>
                    <b>{realisation.name}</b>
                    <br/>
                    <small>{realisation.description}</small>
                    <Output value={ realisation }/>
                </div>
            })}

            <Footer />
        </div>;
    }
});

module.exports = App;
