const { Router } = require('express');
const videogames = require('./Videogame.js');
const UsersController = require('../controllers/Users');
const router = Router();

// Videogames
router.use('/videogames', videogames);
// Users
router.use('/users', UsersController);

module.exports = router;
