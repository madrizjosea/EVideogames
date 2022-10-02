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
        {
          model: Genre,
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
        {
          model: Genre,
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

const addVideogame = async (req, res) => {
  const {
    name,
    description,
    image,
    releaseDate,
    rating,
    audiences,
    genres,
  } = req.body;

  try {
    if (name && description && image && releaseDate && rating) {
      const newGame = await Videogame.create({
        name,
        description,
        image,
        releaseDate,
        rating,
      })

      if (audiences) {
        audiences.forEach(async a => {
          const aud = await Audience.findOne({
            where: { name: a },
          });

          await newGame.addAudiences(aud);
        });
      }

      if (genres) {
        genres.forEach(async g => {
          const gen = await Genre.findOne({
            where: { name: g },
          });

          await newGame.addGenres(gen);
        });
      }

      res.status(200).send(newGame);
    } else {
      res.status(400).send('MISSING FIELDS');
    }
  } catch (err) {
    console.log('POST VIDEOGAME ERROR--->', err);
  }
};

const unavailableVideogame = async (req, res) => {
  const { id } = req.params;
  const {
    isAvailable
  } = req.body;
  try {
      const videogame = await Videogame.findOne({
          where: { id: id }
      });
      videogame.set({
        isAvailable
      });
      await videogame.save();

      res.status(200).json(videogame);
  } catch (err) {
      console.log('PUT VIDEOGAMES ERROR--->', err);
  }
};

const deleteVideogame = async (req, res) => {
  let { id } = req.params;
  try {
      await Videogame.destroy({
          where: { id: id }
      })
      res.status(200).send('Videogame has been deleted');
  } catch (err) {
      console.log('DELETE GAMES BY ID ERROR--->', err);
  }
};

module.exports = {
  getVideogames,
  getVideogameById,
  addVideogame,
  unavailableVideogame,
  deleteVideogame,
};
