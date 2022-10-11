const { Router } = require('express');
const { getGenres, getVidegamesByGenre } = require('../controllers/Genre.js');
const router = Router();

// Todos los géneros
router.get('/', getGenres);
// Videojuegos por género
router.get('/:genreId', getVidegamesByGenre);

module.exports = router;
