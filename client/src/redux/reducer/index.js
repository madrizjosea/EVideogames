import { combineReducers } from 'redux';
import allProductsReducer from './allProductsReducer.js';
import productReducer from './productReducer.js';
import cartReducer from './cartReducer.js';
import userReducer from './userReducer.js';

export default combineReducers({
  allProductsReducer, 
  productReducer, 
  cartReducer, 
  userReducer
});
