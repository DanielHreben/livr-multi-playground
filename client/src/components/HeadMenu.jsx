import React          from 'react';
import PropTypes      from 'prop-types';

import NavItem        from 'react-bootstrap/lib/NavItem';
import Navbar         from 'react-bootstrap/lib/Navbar';
import Nav            from 'react-bootstrap/lib/Nav';
import NavDropdown    from 'react-bootstrap/lib/NavDropdown';
import MenuItem       from 'react-bootstrap/lib/MenuItem';

import './HeadMenu.less';

class HeadMenu extends React.Component {
    static propTypes = {
        onPresetClick : PropTypes.func.isRequired,
        presets       : PropTypes.array
    }

    static defaultProps = {
        presets : []
    }

    handlePresetClick(preset, event) {
        this.props.onPresetClick(preset);
        event.preventDefault();
    }

    renderPresetsItems() {
        return (
            this.props.presets.map(preset => (
                <MenuItem key={preset.id} onClick={this.handlePresetClick.bind(this, preset.payload)}>
                    {preset.id}
                </MenuItem>)
            )
        );
    }

    render() {
        return (
            <Navbar className='HeadMenu'>
                <Nav>
                    <NavItem key={1} className='sitename'>
                        LIVR MULTI PLAYGROUND
                    </NavItem>

                    <NavDropdown id={'headDropdown'} key={2} title='Examples'>
                        {this.renderPresetsItems()}
                    </NavDropdown>

                    <NavItem key={3} href='http://livr-spec.org/' target='_blank'>
                        livr-spec.org
                    </NavItem>

                    <NavItem key={4} href='https://github.com/DanielHreben/livr-multi-playground/' target='_blank'>
                        Github
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default HeadMenu;
