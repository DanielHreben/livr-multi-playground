import './assets';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';
import { version } from '../package.json';
import AppState from './stores/AppState';

const appState = new AppState();

console.info(`Version ${version}`);

ReactDOM.render(<App appState={appState}/>, document.getElementById('content'));
