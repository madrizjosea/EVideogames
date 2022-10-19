import {
    GET_REVIEWS_BY_GAME,
    GET_REVIEWS_BY_USER
} from '../actions/types.js';

const initialState = {
    userReviews: [],
    gameReviews: [],
};

export default function reviews(state = initialState, action) {
    switch (action.type) {

        case GET_REVIEWS_BY_GAME:
            return {
                ...state,
                allGames: action.payload,
            };

        case GET_REVIEWS_BY_USER:
            return {
                ...state,
                games: action.payload,
            };

        default:
            return {
                ...state,
            };
    }
}
