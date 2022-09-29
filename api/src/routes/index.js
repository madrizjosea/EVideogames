const { Router } = require('express');
const videogames = require('./Videogame.js');
const router = Router();

// Videogames
router.use('/videogames', videogames);

module.exports = router;
