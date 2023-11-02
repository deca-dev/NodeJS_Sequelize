const router = require('express').Router();
const moviesServices = require('./movies.services');

//? Prefijo: "/api/v1/movies"

router.get('/', moviesServices.getAllMovies)
router.post('/', moviesServices.postMovie);

router.get('/:id', moviesServices.getMovieById);
router.delete('/:id', moviesServices.deleteMovie)
router.patch('/:id', moviesServices.patchMovie)
// router.put('/:id')

module.exports = router;
