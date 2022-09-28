const { Router } = require('express');
const {
  getVideogames,
  getVideogamesByGenre,
} = require('../controllers/videogameControllers.js');
const router = Router();

// Todos los videojuegos
router.get('/', getVideogames);
// Videojuegos por género
router.get('/genre/:genreId', getVideogamesByGenre);

module.exports = router;
