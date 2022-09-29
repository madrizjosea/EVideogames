import {
    GET_USER,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
} from '../types.js';

const initialState = {
    user: [],
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {

        case GET_USER:
            return {
                ...state
            };

        case ADD_USER:
            return {
                ...state
            };

        case EDIT_USER:
            return {
                ...state
            };

        case DELETE_USER:
            return {
                ...state
            };

        default:
            return {
                ...state,
            };
    }
}