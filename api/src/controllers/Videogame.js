const { Videogame, Genre, Audience } = require('../db.js');
const { Op } = require('sequelize');

// Todos los videojuegos
const getVideogames = async (req, res, next) => {
  const { name } = req.query;
  try {
    // Busqueda por nombre si se envía por query
    let condition = {};
    if (name) {
      condition = {
        name: {
          [Op.iLike]: '%' + name + '%',
        },
      };
    }
    const videogames = await Videogame.findAll({
      where: condition,
      include: [
        {
          model: Audience,
          attributes: ['name'],
          through: { attributes: [] },
        },
        { model: Genre,
          attributes: ['name'],
          through: { attributes: [] }
        },
      ],
      attributes: {
        exclude: ['description', 'minReq', 'recommendedReq'],
      },
    });

    if (videogames.length) res.status(200).json(videogames);
    else res.status(204).send('No se encontraron videojuegos.');

  } catch (error) {
    next(error);
  }
};

// Detalles de un Videojuego
const getVideogameById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const videogame = await Videogame.findAll({
      where: {
        id,
      },
      include: [
        {
          model: Audience,
          attributes: ['name'],
          through: { attributes: [] },
        },
        { model: Genre,
          attributes: ['name'],
          through: { attributes: [] }
        },
      ],
    });

    if (videogame) res.status(200).json(videogame);
    else res.status(201).send('No existe un videojuego con ese ID');

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVideogames,
  getVideogameById,
};
