#!/usr/bin/env node
'use strict';
const {main} = require('./dist/main/index.js');

const currentVersion = process.versions.node;
const requiredMajorVersion = parseInt(currentVersion.split('.')[0], 10);
const minimumMajorVersion = 14;

if (requiredMajorVersion < minimumMajorVersion) {
    console.error(`Node.js v${currentVersion} is out of date and unsupported!`);
    console.error(`Please use Node.js v${minimumMajorVersion} or higher.`);
    process.exit(1);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
