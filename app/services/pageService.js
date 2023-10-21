const { movieRepository, userRepository } = require('../repositories');

module.exports = {
    // Pagination Movies
    getMoviePagination(limit, offset) {
        return movieRepository.findAndCountAll(limit, offset)
    },

    // Pagination Users
    getUserPagination(limit, offset) {
        return userRepository.findAndCountAll(limit, offset);
    }
}