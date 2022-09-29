const { Router } = require('express');
const { getVideogames, getVideogameById } = require('../controllers/Videogame.js');
const router = Router();

// Todos los videojuegos
router.get('/', getVideogames);
router.get('/:id', getVideogameById);

module.exports = router;
