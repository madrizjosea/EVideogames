import {
    GET_GAME,
    ADD_GAME,
    EDIT_GAME,
    DELETE_GAME,
} from '../types.js';

const initialState = {
    game: [],
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {

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