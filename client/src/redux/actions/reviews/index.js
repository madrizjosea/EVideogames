import axios from '../../../axios';
import {
    GET_REVIEWS_BY_GAME,
    GET_REVIEWS_BY_USER
} from '../types.js';

export function getReviewsByGame(userId) {
    return async function (dispatch) {
        await axios.get(`/users/byUser/${userId}`);
        dispatch({ type: GET_REVIEWS_BY_GAME })
    } 
}

export function getReviewsByUser(videogameId) {
    return async function (dispatch) {
        await axios.get(`/users/byGame/${videogameId}`);
        dispatch({ type: GET_REVIEWS_BY_USER })
    } 
}
