import { GET_ORDERS } from '../actions/types.js';

const initialState = {
  allOrders: [],
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
