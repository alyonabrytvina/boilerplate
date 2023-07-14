const express = require('express');
const dotenv = require('dotenv');
const envs = require('../env');
const setUp = require('../setup');
const setDocs = require('../swagger');
const setHandlers = require('../handlers');

dotenv.config({ path: envs[process.env.NODE_ENV || 'default'] });
const app = express();

setUp(app);
setDocs(app);
setHandlers(app);

module.exports = app;
