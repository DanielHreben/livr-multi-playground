import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import { version } from '../../package.json';

import './Footer.less';

const Footer = React.createClass({
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

export default Footer;
