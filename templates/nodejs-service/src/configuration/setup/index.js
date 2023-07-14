const { appRouter } = require('../routes');

module.exports = app => {
    app.use('/', appRouter);
};
