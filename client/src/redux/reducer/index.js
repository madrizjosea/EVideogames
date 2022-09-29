import { combineReducers } from 'redux';
import allGamesReducer from './allGamesReducer.js';
import gameReducer from './gameReducer.js';
import cartReducer from './cartReducer.js';
import userReducer from './userReducer.js';

export default combineReducers({
  allGamesReducer, 
  gameReducer, 
  cartReducer, 
  userReducer
});
