const { Router } = require('express');
const hello = require('../controllers/index');

const appRouter = new Router();
appRouter.get('/', hello);

exports.appRouter = appRouter;
