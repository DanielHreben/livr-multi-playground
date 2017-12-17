import React from 'react';
import PropTypes      from 'prop-types';

import './StatusBar.less';

const StatusBar = ({ status, message }) => {
    const statusClass = status === 'done'
        ? 'notification-icon-done'
        : 'notification-icon-loading';

    return (
        <div className ='StatusBar'>
            <div className={statusClass} />
            <p>{message}</p>
        </div>
    );
};

StatusBar.propTypes = {
    status  : PropTypes.string.isRequired,
    message : PropTypes.string.isRequired
};

export default StatusBar;
