import { combineReducers } from 'redux';
import games from './games.js';
import cart from './cartReducer.js';
import users from './userReducer.js';

export default combineReducers({
  allGamesReducer, 
  gameReducer, 
  cartReducer, 
  userReducer
});
