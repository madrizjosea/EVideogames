import axios from '../../../axios';
import { GET_ORDERS } from '../types.js';

export function getOrders() {
  return async function (dispatch) {
    const orders = await axios.get('/orders');
    dispatch({ type: GET_ORDERS, payload: orders.data });
  };
}
