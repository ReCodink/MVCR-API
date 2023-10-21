require('dotenv').config();

const {
    MORGAN_FORMAT = 'dev',
    JWT_SECRET_KEY = 'MVCR',
    EMAIL_SECRET_KEY = 'API',
    SALT = 10,
} = process.env;

module.exports = {
    MORGAN_FORMAT,
    JWT_SECRET_KEY,
    EMAIL_SECRET_KEY,
    SALT: parseInt(SALT),
};