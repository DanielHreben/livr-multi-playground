'use strict';

let React = require('react');

let Col = require('react-bootstrap/lib/Col');
let Row = require('react-bootstrap/lib/Row');

import { version } from '../../package.json';

require('./Footer.less');

let Footer = React.createClass({
    render() {
        return (
            <Row className='Footer'>
                <Col xs={12}>
                    <small>
                        Developed by <a href='http://sdswanderer.github.io/about/' target='_blank'> Dan </a>
                        and <a href='https://github.com/pterolex' target='_blank'>Alexey</a>
                    </small>
                    <br />
                    <small>
                        Version {version}
                    </small>
                </Col>
            </Row>

        );
    }
});

module.exports = Footer;
