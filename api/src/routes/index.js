const { Router } = require('express');
const Videogame = require('./Videogame.js');
const Genre = require('./Genre.js');
const Audience = require('./Audience.js');
const UsersController = require('../controllers/Users');
const OrdersController = require('../controllers/Orders');
const ReviewRoutes = require('./ReviewRoutes.js');
const router = Router();

// Videogames
router.use('/videogames', Videogame);
// Users
router.use('/users', UsersController);
// Genres
router.use('/genres', Genre);
// Audiences
router.use('/audiences', Audience);
// Orders
router.use('/orders', OrdersController);
// Reviews
router.use('/reviews', ReviewRoutes);

module.exports = router;
