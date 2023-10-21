const { authRepository } = require('../repositories');

module.exports = {
    // Register Users
    create(args) {
        return authRepository.create(args);
    },

    // Login Users
    findByEmail(email) {
        return authRepository.findByEmail(email);
    }
}