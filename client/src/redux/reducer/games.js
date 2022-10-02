import {
    GET_ALL_GAMES,
    GET_GAME_QUERY,
    GET_GENRES,
    GENRE_FILTER,
    GET_AUDIENCES,
    AUDIENCE_FILTER,
    NAME_ORDER,
    GET_GAME,
    ADD_GAME,
    EDIT_GAME,
    DELETE_GAME,
} from '../actions/types.js';

const initialState = {
    allGames: [],
    allGenres: [],
    allAudiences: [],
    games: [],
    game: {},
};

export default function games(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload,
            };

        case GET_GAME_QUERY:
            return {
                ...state,
                games: action.payload,
            };

        case GET_GENRES:
            return {
                ...state,
                allGenres: action.payload,
            };

        case GENRE_FILTER:
            return {
                ...state,
                games: action.payload,
            };

        case GET_AUDIENCES:
            return {
                ...state,
                allAudiences: action.payload,
            };

        case AUDIENCE_FILTER:
            return {
                ...state,
                games: action.payload,
            };

        case NAME_ORDER:
            return {
                ...state
            };

        case GET_GAME:
            return {
                ...state,
                game: action.payload,
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
