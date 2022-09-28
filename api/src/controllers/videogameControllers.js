const { Videogame, Genre, Audience } = require('../db.js');
const { Op } = require('sequelize');

// Todos los videojuegos
const getVideogames = async (req, res, next) => {
  try {
    const videogames = await Videogame.findAll();
    if (videogames.length) {
      res.status(200).json(videogames);
    } else {
      res.status(204).send('No se encontraron videojuegos');
    }
  } catch (error) {
    next(error);
  }
};

// Videojuegos por género
const getVideogamesByGenre = async (req, res, next) => {
  const { genreId } = req.params;
  try {
    const videogamesByGenre = await Genre.findAll({
      where: {
        id: genreId,
      },
      include: { model: Videogame },
    });

    if (videogamesByGenre.length) {
      res.status(200).json(videogamesByGenre);
    } else {
      res.status(204).send('No se encontraron videojuegos para ese género');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVideogames,
  getVideogamesByGenre,
};
