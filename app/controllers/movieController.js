class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }

    getAllMovies = async (request, response) => {
        try {
            const movies = await this.movieService.getAllMovie(args);
            return response.status(200).json({
                message: 'Get All Movie Succesfully',
                data: movies
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: 'Get All Movie Failed'
            });
        }
    }

    getMovieById = async (request, response) => {
        try {
            const movie = await this.movieService.getMovieById(id);
            if (!movie) {
                return response.status(404).json({
                    message: 'Movie Not Found'
                });
            }
            return response.status(200).json({
                message: `Get Movie Successfully at id: ${id}`,
                data: movie
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: `Get Movie Failed at id: ${id}`
            });
        }
    }

    createNewMovie = async (request, response) => {
        try {
            if (
                !request.body.title || 
                !request.body.genres || 
                !request.body.year
                ) {
                return response.status(400).json({ message: 'All fields are required' }); // Perbaiki pesan error
            }

            const title = request.body.title;
            const genres = request.body.genres;
            const year = request.body.year;
            const movie = await this.movieService.createMovie({
                title: title,
                genres: genres,
                year: year
            });

            return response.status(200).json({
                status: 'success',
                message: 'Movie Created Successfully',
                data: movie
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: 'Movie Created Failed',
                error: err.message
            });
        }
    };

    updateMovieById = async (request, response) => {
        const id = request.params.id;
        try {
            const movie = await this.movieService.getMovieById(id);
            if (!movie) {
                return response.status(404).json({
                    message: 'Movie Not Found'
                });
            }
            const updateMovie = await this.movieService.update(id, request.body);
            return response.status(200).json({
                message: `Movie Updated Successfully at ID: ${id}`,
                data: updateMovie
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: `Movie Updated Failed at ID: ${id}`
            })
        }
    };

    deleteMovieById = async (request, response) => {
        const id = request.params.id;
        try {
            const movie = await this.movieService.getMovieById(id);
            if (!movie) {
                return response.status(404).json({
                    message: 'Movie Not Found'
                });
            }
            await this.movieService.deleteMovie(id);
            return response.status(200).json({
                message: `Movie Deleted Successfully at ID: ${id}`
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: `Movie Deleted Failed at ID: ${id}`
            });
        }
    }

    uploadMovieById = async (request, response) => {
        const id = request.params.id;
        try {
            const movie = await this.movieService.getMovieById(id);
            if (!request.file) {
                return response.status(400).json({ message: 'No file uploaded' });
            }
            if (!movie) {
                return response.status(404).json({
                    message: 'Movie Not Found'
                });
            }
    
            await this.movieService.uploadFile(id, request)
            
            return response.status(200).json({
                message: `Photo Movies uploaded Successfully at ID: ${id}`
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
}

module.exports = MovieController;