const express = require('express');
const controller = require('../controllers');
const upload = require('../middleware/multer');
const verifyToken = require('../middleware/authJWT');
const {
    authService,
    movieService,
    userService,
    pageService
} = require('../services');

const apiRouter = express.Router();

// AUTH ENDPOINT
const authController = new controller.authController(authService);

apiRouter.post("/users/register", authController.registerUser);
apiRouter.post("/users/login", authController.loginUser);

// MOVIES ENDPOINT
const movieController = new controller.movieController(movieService);

apiRouter.get('/movies', verifyToken, movieController.getAllMovies);
apiRouter.get('/movies/:id', verifyToken, movieController.getMovieById);
apiRouter.post('/movies', verifyToken, movieController.createNewMovie);
apiRouter.put('/movies/:id', verifyToken, movieController.updateMovieById);
apiRouter.delete('/movies/:id', verifyToken, movieController.deleteMovieById);
// Upload file movies
apiRouter.put('/movies/upload/:id', verifyToken, upload.single('photo'), movieController.uploadMovieById);

// USERS ENDPOINT
const userController = new controller.userController(userService);

apiRouter.get('/users', verifyToken, userController.getAllUsers);
apiRouter.get('/users/:id', verifyToken, userController.getUserById);
apiRouter.post('/users', verifyToken, userController.createNewUser);
apiRouter.put('/users/:id', verifyToken, userController.updateUserById);
apiRouter.delete('/users/:id', verifyToken, userController.deleteUserById);

// PAGINATION ENDPOINT
const paginationController = new controller.paginationController(pageService);

// Endpoint untuk mendapatkan user dengan pagination
apiRouter.get("/pagination/users/paginate", verifyToken, paginationController.getUserPagination, (req, res) => {
    res.json(res); // Menggunakan res.json() untuk mengirim hasil
});
// Endpoint untuk mendapatkan movies dengan pagination
apiRouter.get("/pagination/movies/paginate", verifyToken, paginationController.getMoviePagination, (req, res) => {
    res.json(res); // Menggunakan res.json() untuk mengirim hasil
});

module.exports = apiRouter;
