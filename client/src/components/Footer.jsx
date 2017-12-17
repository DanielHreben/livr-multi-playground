import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import { version } from '../../package.json';

import './Footer.less';

const Footer = () => {
    return (
        <Row className='Footer'>
            <Col xs={12}>
                <small>
                    Developed by <a href='https://github.com/danielhreben' rel='noopener noreferrer' target='_blank'> Dan </a>
                    and <a href='https://github.com/pterolex' rel='noopener noreferrer' target='_blank'>Alexey</a>
                </small>
                <br />
                <small>
                        Version {version}
                </small>
            </Col>
        </Row>

    );
};

export default Footer;
