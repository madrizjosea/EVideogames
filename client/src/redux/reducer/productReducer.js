import {
  GET_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from '../types.js';

const initialState = {
  product: [],
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {

    case GET_PRODUCT:
      return {
        ...state
      };

    case ADD_PRODUCT:
      return {
        ...state
      };

    case EDIT_PRODUCT:
      return {
        ...state
      };

    case DELETE_PRODUCT:
      return {
        ...state
      };

    default:
      return {
        ...state,
      };
  }
}