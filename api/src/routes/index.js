const { Router } = require('express');
const videogameRoutes = require('./videogameRoutes.js');
const router = Router();

// Videogames
router.use('/videogames', videogameRoutes);

module.exports = router;
