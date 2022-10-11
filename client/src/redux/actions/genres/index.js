import axios from '../../../axios';
import {
    GET_GENRES,
    GENRE_FILTER,
} from '../types.js';

export function getGenres() {
    return async function (dispatch) {
        const genres = await axios.get('/genres');
        dispatch({ type: GET_GENRES, payload: genres.data });
    };
};

export function getGamesByGenre(id) {
    return async function (dispatch) {
        var games = await axios.get(`/genres/${id}`);
        dispatch({ type: GENRE_FILTER, payload: games.data });
    };
};