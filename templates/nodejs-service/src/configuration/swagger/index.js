const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

module.exports = app => {
    const swaggerFilePath = path.join(__dirname, '..', '..', '..', 'swagger.ts');
    const document = require(swaggerFilePath);

    app.use('/api-specs', express.static(swaggerFilePath));
    app.use(
        '/api-docs',
        (req, res, next) => {
            document.host = req.get('host');
            req.swaggerDoc = document;
            next();
        },
        swaggerUi.serve,
        swaggerUi.setup()
    );
};

