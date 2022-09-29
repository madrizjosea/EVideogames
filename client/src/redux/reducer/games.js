import {
    GET_ALL_GAMES,
    GET_GENRES,
    GENRE_FILTER,
    NAME_ORDER,
    GET_GAME,
    ADD_GAME,
    EDIT_GAME,
    DELETE_GAME,
} from '../types.js';

const initialState = {
    allGames: [],
    game: [],
};

export default function games(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_GAMES:
            return {
                ...state
            };

        case GET_GENRES:
            return {
                ...state
            };

        case GENRE_FILTER:
            return {
                ...state
            };

        case NAME_ORDER:
            return {
                ...state
            };

        case GET_GAME:
            return {
                ...state
            };

        case ADD_GAME:
            return {
                ...state
            };

        case EDIT_GAME:
            return {
                ...state
            };

        case DELETE_GAME:
            return {
                ...state
            };

        default:
            return {
                ...state,
            };
    }
}
