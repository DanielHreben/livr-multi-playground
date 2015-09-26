#!/usr/bin/env node
'use strict';

console.log(
    'node.js',
    process.version,
    'livr',
    require('./node_modules/livr/package.json').version
);