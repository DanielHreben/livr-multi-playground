'use strict';

let React  = require('react');

let Row    = require('react-bootstrap/lib/Row');
let Col    = require('react-bootstrap/lib/Col');

let Editor   = require('./components/Editor.jsx');
let Output   = require('./components/Output.jsx');
let HeadMenu = require('./components/HeadMenu.jsx');
let Footer   = require('./components/Footer.jsx');

let jsonUtils = require('./jsonUtils');
let API       = require('./API');
let presets   = require('./presets/');

require('./App.less');

let api = new API(config.api);

let App = React.createClass({
    componentDidMount() {
        this.validate();
    },

    getInitialState() {
        let parsed = this.parseURL();

        return {
            rules: parsed.rules,
            data: parsed.data,
            realisations: [],
        };
    },

    validate() {
        try {
            api.validate(jsonUtils.parse(this.state.data), jsonUtils.parse(this.state.rules)).then(data => {
                this.setState({realisations: data.realisations});
            });
        } catch(e) {
            console.warn(e.message || e);
        }
    },

    handleIEditorChange(type, text) {
        this.state[type] = text;
        this.setState(this.state);

        this.updateURL();
        this.validate();
    },

    handlePresetSelect(preset) {
        this.setState({
            rules: preset.rules,
            data: preset.data,
        });

        this.updateURL();
        this.validate();
    },

    updateURL() {
        window.location.hash = encodeURIComponent(JSON.stringify({
            rules: this.state.rules,
            data: this.state.data
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
                data: '{}'
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
                            onChange={this.handleIEditorChange.bind(this, 'rules')} />
                </Col>

                 <Col xs={6}>
                    <Editor label='Data for validation'
                            value={this.state.data}
                            type='data'
                            onChange={this.handleIEditorChange.bind(this, 'data')} />
                </Col>
            </Row>

            {this.state.realisations.map(realisation => {
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
