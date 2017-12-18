import './assets';

import { render } from 'react-dom';
import React from 'react';
import { version } from '../package.json';
import App from './App.jsx';
import AppState from './stores/AppState';

const appState = new AppState();

console.info(`Version ${version}`);

render(<App appState={appState} />, document.getElementById('content'));
