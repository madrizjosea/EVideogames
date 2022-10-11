const { Videogame, Genre } = require('../db.js');

// Todos los géneros
const getGenres = async (req, res, next) => {
  try {
    const genres = await Genre.findAll();

    if (genres.length) res.status(200).json(genres);
    else res.status(204).send('No gender found');
  } catch (error) {
    next(error);
  }
};

// Videojuegos pertenecientes a un género en particular
const getVidegamesByGenre = async (req, res, next) => {
  const { genreId } = req.params;
  try {
    const gamesByGenre = await Genre.findByPk(genreId, {
      include: [
        {
          model: Videogame,
          attributes: {
            exclude: ['description', 'minReq', 'recommendedReq'],
          },
          through: { attributes: [] },
        },
      ],
    });

    if (gamesByGenre.videogames.length) {
      res.status(200).json(gamesByGenre);
    } else {
      res.status(201).send('There are no video games with that genre');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGenres,
  getVidegamesByGenre,
};
