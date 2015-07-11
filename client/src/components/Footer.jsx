'use strict';

let React = require('react');

let Col = require('react-bootstrap/lib/Col');
let Row = require('react-bootstrap/lib/Row');

require('./Footer.less');

let Footer = React.createClass({
    render() {
        return (
            <Row className='Footer'>
                <Col xs={12}>
                    <small>
                        Developed by <a href='http://gplus.to/wanderer' target='_blank'> Dan </a>
                    </small>
                </Col>
            </Row>

        );
    }
});

module.exports = Footer;