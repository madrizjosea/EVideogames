import axios from '../../../axios';
import {
    GET_AUDIENCES,
    AUDIENCE_FILTER,
} from '../types.js';

export function getAudiences() {
    return async function (dispatch) {
        const audiences = await axios.get('/audiences');
        dispatch({ type: GET_AUDIENCES, payload: audiences.data });
    };
};

export function getGamesByAudience(id) {
    return async function (dispatch) {
        var games = await axios.get(`/audiences/${id}`);
        dispatch({ type: AUDIENCE_FILTER, payload: games.data });
    };
};