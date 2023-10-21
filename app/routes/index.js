const apiRouter = require('./apiRouter');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const winston = require('winston');
const docsRouter = require('./docsRouter');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});
    
function apply(app) {
    dotenv.config();
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.originalUrl}`);
        next();
    });
    app.use('', docsRouter);
    app.use('/api', apiRouter);
    app.use('/static', express.static(path.join (__dirname, '../../public')));
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.originalUrl}`);
        next();
    });
    const GeneralErrorHandler = (err, req, res, next) => {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    };
    app.use(GeneralErrorHandler);

    return app;
};

module.exports = { apply };