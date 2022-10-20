import axios from '../../../axios';
import {
  GET_REVIEWS_BY_GAME,
  GET_REVIEWS_BY_USER,
  ADD_REVIEW,
} from '../types.js';

export function getReviewsByUser(email) {
  return async function (dispatch) {
    const userReviews = await axios.get(`/reviews/byUser/${email}`);
    dispatch({ type: GET_REVIEWS_BY_USER, payload: userReviews.data });
  };
}

export function getReviewsByGame(videogameId) {
  return async function (dispatch) {
    const reviewsByGame = await axios.get(`/reviews/byGame/${videogameId}`);
    dispatch({ type: GET_REVIEWS_BY_GAME, payload: reviewsByGame.data });
  };
}

export function addReview(payload) {
  return async function (dispatch) {
    const review = await axios.post('/reviews/create', payload);
    dispatch({ type: ADD_REVIEW, payload: review.data });
  };
}
