import React from 'react';

import './StatusBar.less';

const StatusBar = React.createClass({
    render() {
        let statusClass = this.props.status === 'done'
            ? 'notification-icon-done'
            : 'notification-icon-loading';

        return (
            <div className ='StatusBar'>
                <div className={statusClass}/>
                <p>{this.props.message}</p>
            </div>
        );
    }

});

export default StatusBar;
