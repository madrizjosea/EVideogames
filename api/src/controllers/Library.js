const { Library, Videogame } = require('../db.js');

const getAccountLibrary = async (req, res, next) => {
  const { email } = req.params;
  try {
    const library = await Library.findOne({
      where: {
        accountEmail: email,
      },
      include: {
        model: Videogame,
        attributes: {
          exclude: ['description', 'minReq', 'recommendedReq', 'isAvailable'],
        },
        through: { attributes: [] }
      },
    });

    if (library) res.status(200).json(library);
    else res.status(204).send('This library is empty');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAccountLibrary,
};
