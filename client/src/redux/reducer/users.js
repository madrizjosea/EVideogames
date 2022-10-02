import {
    GET_USER,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
} from '../actions/types.js';

const initialState = {
    allUsers: [],
    user: [],
};

export default function users(state = initialState, action) {
    switch (action.type) {

        case GET_USER:
            return {
                ...state,
                user: action.payload,
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