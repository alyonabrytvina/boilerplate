const path = require('path');

module.exports = {
    test: path.join(__dirname, '..', '..', '..', '.env.example.test'),
    production: path.join(__dirname, '..', '..', '..', '.env.example.production'),
    // Change the path '.env.example' to '.env.example' to make it work in dev mode
    default: path.join(__dirname, '..', '..', '..', '.env.example')
};
