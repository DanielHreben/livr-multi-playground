'use strict';
import './assets';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';
import { version } from '../package.json';

console.info(`Version ${version}`);

ReactDOM.render( <App/>, document.getElementById('content') );