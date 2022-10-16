const { Review } = require('../db');

// Todas las reseñas
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll();

    if (reviews.length > 0) res.status(200).json(reviews);
    else res.status(204).send('No reviews found');
  } catch (error) {
    next(error);
  }
};

// Todas las reseñas de un usuario
const getReviewsByUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const reviewsByUser = await Review.findAll({
      where: {
        userId,
      },
    });

    if (reviewsByUser.length > 0) res.status(200).json(reviewsByUser);
    else res.status(204).send('This user has not submitted a review yet');
  } catch (error) {
    next(error);
  }
};

// Reseñas de un juego en particular
const getReviewsByVideogame = async (req, res, next) => {
  const { videogameId } = req.params;

  try {
    const reviewsByVideogame = await Review.findAll({
      where: {
        videogameId,
      },
    });

    if (reviewsByVideogame.length > 0) res.status(200).json(reviewsByVideogame);
    else res.status(204).send('This videogame has no reviews');
  } catch (error) {
    next(error);
  }
};

// Crear una reseña
const createReview = async (req, res, next) => {
  const { content, rating, userId, videogameId } = req.body;
  try {
    const userGameReview = await Review.findAll({
      where: {
        userId,
        videogameId,
      },
    });

    if (userGameReview.length > 0) {
      res.status(404).json({
        message: `You can't submit another review for this videogame`,
      });
    } else {
      const newReview = await Review.create({
        content,
        rating,
      });

      if (newReview) {
        await newReview.setUser(userId);
        await newReview.setVideogame(videogameId);
        res.status(201).json(newReview);
      } else {
        res.status(400).send('Failed to create a new review');
      }
    }
  } catch (error) {
    next(error);
  }
};

// Actualizar una reseña
const updateReview = async (req, res, next) => {
  const { reviewId, content, rating, userId } = req.body;

  try {
    const foundReview = await Review.findByPk(reviewId);
    if (foundReview && foundReview.userId === userId) {
      await foundReview.update({
        content,
        rating,
      });
      await foundReview.save();
      res.status(200).send('Review updated successfully');
    } else {
      res.status(401).send(`You can't update another user's review`);
    }
  } catch (error) {
    next(error);
  }
};

// Borrar una reseña
const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const foundReview = await Review.findByPk(reviewId);
    if (foundReview) {
      await foundReview.destroy();
      res.status(200).send('Review deleted successfully');
    } else {
      res.status(204).send('No review found by that id');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviews,
  getReviewsByUser,
  getReviewsByVideogame,
  createReview,
  updateReview,
  deleteReview,
};
