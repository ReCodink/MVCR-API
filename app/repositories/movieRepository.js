const { movies } = require('../models');

module.exports = {
    // Create Movies
    create(args) {
        return movies.create(args);
    },

    // Update Movies By Id
    update(id, args) {
        return movies.update(args, {
            where: {
                id,
            }
        });
    },

    // Find All Movies
    findAll(args) {
        return movies.findAll(args);
    },

    // Find Movies By Id
    find(id) {
        return movies.findByPk(id);
    },

    // Delete Movies By Id
    delete(id) {
        return movies.destroy({ where: { id: id } });
    },

    // Pagination Movies
    findAndCountAll(limit, offset) {
        return movies.findAndCountAll({
            limit,
            offset
        });
    },

    // Upload Movies Photo
    upload(id, request) {
        return movies.update(
            { photo: request.file.path },
            { where: { id: id } }
        );
    }
};
