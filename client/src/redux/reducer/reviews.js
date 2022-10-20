import {
    GET_REVIEWS_BY_GAME,
    GET_REVIEWS_BY_USER,
    ADD_REVIEW
} from '../actions/types.js';

const initialState = {
    gameReviews: [],
    userReviews: [],
};

export default function reviews(state = initialState, action) {
    switch (action.type) {

        case GET_REVIEWS_BY_GAME:
            return {
                ...state,
                gameReviews: action.payload,
            };

        case GET_REVIEWS_BY_USER:
            return {
                ...state,
                userReviews: action.payload,
            };

        case ADD_REVIEW:
            return {
                ...state,
            };

        default:
            return {
                ...state,
            };
    }
}
