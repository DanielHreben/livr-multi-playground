'use strict';

let React = require('react');
require('./StatusBar.less');

let StatusBar = React.createClass({

    render() {

        let statusClass = this.props.status == 'done'
            ? "notification-icon-done"
            : "notification-icon-loading";

        return (
            <div className ='StatusBar'>
                <div className={statusClass}/>
                <p>{this.props.message}</p>
            </div>
        );
    }

});

module.exports = StatusBar;
