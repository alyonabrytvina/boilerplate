const errorHandler = require('./error-handler');

module.exports = app => {
    app.use(errorHandler);
};
