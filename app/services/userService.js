const { userRepository } = require('../repositories');

module.exports = {
    // Create Users
    create(args) {
        return userRepository.create(args);
    },

    // Update Users By Id
    update(id, args) {
        return userRepository.update(id, args);
    },

    // Find All Users
    getAllUser(args) {
        return userRepository.findAll(args);
    },

    // Find Users By Id
    getUserById(id) {
        return userRepository.find(id);
    },

    // Delete Users By Id
    deleteUser(id) {
        return userRepository.delete(id);
    }
}