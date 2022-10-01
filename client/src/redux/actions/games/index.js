import axios from '../../../axios';
import {
    GET_ALL_GAMES,
    GET_GAME_QUERY,
    NAME_ORDER,
    GET_GAME,
    ADD_GAME,
    EDIT_GAME,
    DELETE_GAME
} from '../types.js';

export function getAllGames() {
    return async function (dispatch) {
        const games = await axios.get('/videogames');
        dispatch({ type: GET_ALL_GAMES, payload: games.data });
    };
};

export function getGameQuery(query) {
    return async function (dispatch) {
        try {
            const game = await axios.get(`/videogames?name=${query}`);
            dispatch({ type: GET_GAME_QUERY, payload: game.data });
        } catch {
            dispatch({ type: GET_GAME_QUERY, payload: '' });
        }
    };
};

// NAME_ORDER

export function getGame(id) {
    return async function (dispatch) {
        var game = await axios.get(`/videogames/${id}`);
        dispatch({ type: GET_GAME, payload: game.data });
    };
};

// ADD_GAME
// EDIT_GAME
// DELETE_GAME