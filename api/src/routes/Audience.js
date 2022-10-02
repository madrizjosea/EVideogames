const { Router } = require('express');
const {
  getAudiences,
  getVideogamesByAudience,
} = require('../controllers/Audience.js');
const router = Router();

// Todas las audiencias
router.get('/', getAudiences);
// Videojuegos por audiencia
router.get('/:audienceId', getVideogamesByAudience);

module.exports = router;
