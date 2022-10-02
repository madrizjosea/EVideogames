const { Router } = require('express');
const router = Router();
const {
    getVideogames,
    getVideogameById,
    addVideogame,
    unavailableVideogame,
    deleteVideogame } = require('../controllers/Videogame.js');

// Todos los videojuegos
router.get('/', getVideogames);
// add new game
router.post('/', addVideogame);
// game details
router.get('/:id', getVideogameById);
// change availability
router.put('/:id', unavailableVideogame);
// full delete
router.delete('/:id', deleteVideogame);

module.exports = router;



