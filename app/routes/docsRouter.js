const express = require('express');
const swaggerUI = require('swagger-ui-express');

const swaggerDocument= require('../swagger');
const docsRouter = express.Router();

docsRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = docsRouter;