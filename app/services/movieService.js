const { movieRepository } = require('../repositories');

module.exports = {
    // Create Movies
    create(args) {
        return movieRepository.create(args);
    },

    // Update Movies By Id
    update(id, request) {
        return movieRepository.update(id, args);
    },

    // Find All Movies
    getAllMovie(args) {
        return movieRepository.findAll(args);
    },

    // Find Movies By Id
    getMovieById(id) {
        return movieRepository.find(id);
    },

    // Delete Movies By Id
    deleteMovie(id) {
        return movieRepository.delete(id);
    },

    uploadFile(id, request) {
        return movieRepository.upload(id, request);
    }
}