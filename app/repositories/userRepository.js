const users = require('../models').users; // Membaca model 'users' dari modul models

module.exports = {
    // Create users
    create(args) {
        return users.create(args);
    },

    // Update users By Id
    update(id, args) {
        return users.update(args, {
            where: {
                id,
            }
        });
    },

    // Find All users
    findAll(args) {
        return users.findAll(args);
    },

    // Find users By Id
    find(id) {
        return users.findByPk(id);
    },

    // Delete users By Id
    delete(id) {
        return users.destroy({ where: {id: id} });
    },

    // Pagination users
    findAndCountAll(limit, offset) {
        return users.findAndCountAll({
            limit,
            offset
        });
    }
};
