const { Router } = require('express');
const router = Router();
const {
  getReviews,
  getReviewsByUser,
  getReviewsByVideogame,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/Review.js');

router.get('/', getReviews);
router.get('/byUser/:email', getReviewsByUser);
router.get('/byGame/:videogameId', getReviewsByVideogame);
router.post('/create', createReview);
router.put('/update', updateReview);
router.delete('/:reviewId', deleteReview);

module.exports = router;
