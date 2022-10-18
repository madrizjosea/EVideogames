import axios from '../../../axios';
import {
    GET_ALL_GAMES,
    GET_GAME_QUERY,
    NAME_ORDER,
    GET_GAME,
    ADD_GAME,
    EDIT_GAME,
    DELETE_GAME,CLEAR_DETAIL,
    PAGE
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

export function nameOrder(payload) {
    return {
        type: NAME_ORDER, payload
    };
};

export function getGame(id) {
    return async function (dispatch) {
        var game = await axios.get(`/videogames/${id}`);
        dispatch({ type: GET_GAME, payload: game.data });
    };
};

export function addGame(payload) {
    return async function (dispatch) {
        const game = await axios.post('/videogames', payload);
        dispatch({ type: ADD_GAME, payload: game.data })
    };
};

export function editGame(id , payload) {
    return async function (dispatch) {
        const game = await axios.put(`/videogames/${id}`, payload);
        dispatch({ type: EDIT_GAME, payload: game.data })
    };
};

export function deleteGame(id) {
    return async function (dispatch) {
        await axios.delete(`/videogames/${id}`);
        dispatch({ type: DELETE_GAME });
    };
}


//Ezequiel para mostrar
//! clear detail 

export function clearDetail (){
    return {
        type: CLEAR_DETAIL,
        payload: []
    }
    
}

//guardar pagina 

export function savePage(payload){
    return({
        type:PAGE,
        payload
    })
}
