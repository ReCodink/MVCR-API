const { users } = require('../models');

module.exports = {
    // Register Users
    create(args) {
        return users.create(args);
    },

    // Login Users
    findByEmail(email) {
        return users.findOne({ where: { email: email } });
    }
};
