import {
    GET_ALL_PRODUCTS,
    GET_GENRES,
    GENRE_FILTER,
    NAME_ORDER,
} from '../types.js';

const initialState = {
    allProducts: [],
};

export default function allProductsReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_PRODUCTS:
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

        default:
            return {
                ...state,
            };
    }
}
