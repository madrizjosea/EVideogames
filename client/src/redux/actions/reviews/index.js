import axios from '../../../axios';
import {
    GET_REVIEWS_BY_GAME,
    GET_REVIEWS_BY_USER,
    ADD_REVIEW
} from '../types.js';

export function getReviewsByGame(email) {
    return async function (dispatch) {
        await axios.get(`/users/byUser/${email}`);
        dispatch({ type: GET_REVIEWS_BY_GAME })
    } 
}

export function getReviewsByUser(videogameId) {
    return async function (dispatch) {
        await axios.get(`/users/byGame/${videogameId}`);
        dispatch({ type: GET_REVIEWS_BY_USER })
    } 
}

export function addReview(payload) {
    return async function (dispatch) {
        const review = await axios.post('/reviews/create', payload);
        dispatch({ type: ADD_REVIEW, payload: review.data })
    };
};