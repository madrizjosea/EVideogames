import {
    GET_ALL_GAMES,
    GET_GAME_QUERY,
    GET_USER_GAMES,
    GET_GENRES,
    GENRE_FILTER,
    GET_AUDIENCES,
    AUDIENCE_FILTER,
    NAME_ORDER,
    GET_GAME,
    ADD_GAME,
    EDIT_GAME,
    DELETE_GAME,
    CLEAR_DETAIL, 
    PAGE
} from '../actions/types.js';

const initialState = {
    allGames: [],
    games: [],
    game: {},
    allGenres: [],
    allAudiencess: [],
    userGames: []
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

        case GET_USER_GAMES:
            return {
                ...state,
                userGames : action.payload,
            }

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
            let nameOrder;
            if (action.payload === 'A-Z') {
                nameOrder = state.games.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return 0;
                })
            } else if (action.payload === 'Z-A') {
                nameOrder = state.games.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    return 0;
                })
            }
            return { ...state, games: nameOrder };

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
        //* poner cuando las cart renderizen en el estado
        case CLEAR_DETAIL:
            return {
                ...state,
                game: {}               
            };
        case PAGE:
            return {
                ...state,
                pages: action.payload
            }


        default:
            return {
                ...state,
            };
    }
}
