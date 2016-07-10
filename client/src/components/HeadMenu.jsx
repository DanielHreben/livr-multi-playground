let React          = require('react');

let NavItem        = require('react-bootstrap/lib/NavItem');
let Navbar         = require('react-bootstrap/lib/Navbar');
let Nav            = require('react-bootstrap/lib/Nav');
let DropdownButton = require('react-bootstrap/lib/DropdownButton');
let MenuItem       = require('react-bootstrap/lib/MenuItem');

require('./HeadMenu.less');

const HeadMenu = React.createClass({
    getDefaultProps() {
        return {
            presets: []
        };
    },

    handlePresetClick(preset, event) {
        this.props.onPresetClick(preset);
        event.preventDefault();
    },

    renderPresetsItems() {
        return (
            this.props.presets.map(preset =>
                <MenuItem key={preset.id} onClick={this.handlePresetClick.bind(this, preset.payload)}>
                  {preset.id}
                </MenuItem>
            )
        );
    },

    render() {
        return (
            <Navbar className='HeadMenu'>
                <Nav>
                    <NavItem key={1} className='sitename'>
                        LIVR MULTI PLAYGROUND
                    </NavItem>

                    <DropdownButton id={'headDropdown'} key={4} title='Examples'>
                        {this.renderPresetsItems()}
                    </DropdownButton>

                    <NavItem key={2} href='http://livr-spec.org/' target='_blank'>
                        livr-spec.org
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
});

export default HeadMenu;
