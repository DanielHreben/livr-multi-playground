import React from 'react';

import './StatusBar.less';

const StatusBar = React.createClass({
    render() {
        const { status, message } = this.props;

        const statusClass = status === 'done'
            ? 'notification-icon-done'
            : 'notification-icon-loading';

        return (
            <div className ='StatusBar'>
                <div className={statusClass}/>
                <p>{message}</p>
            </div>
        );
    }

});

export default StatusBar;
